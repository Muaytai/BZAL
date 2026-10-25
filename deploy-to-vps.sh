#!/usr/bin/env bash
# =============================================================================
# АВТОМАТИЧЕСКИЙ ДЕПЛОЙ ПОРТАЛА «ТЕХНОПАРК ОАО БЗАЛ» НА VPS (Ubuntu / Debian)
# Использование:
#   ./deploy-to-vps.sh <IP_СЕРВЕРА> <ПОЛЬЗОВАТЕЛЬ> <ПАРОЛЬ> [ДОМЕН]
# Пример:
#   ./deploy-to-vps.sh 195.50.10.25 root MySecretPass123 technopark.bzal.by
# =============================================================================

set -e

VPS_HOST="${1:-$VPS_HOST}"
VPS_USER="${2:-${VPS_USER:-root}}"
VPS_PASS="${3:-$VPS_PASS}"
DOMAIN="${4:-${DOMAIN:-bzal.by}}"
SSH_PORT="${5:-${SSH_PORT:-22}}"
REMOTE_DIR="/var/www/technopark-bzal"

if [ -z "$VPS_HOST" ] || [ -z "$VPS_PASS" ]; then
  echo "Использование: ./deploy-to-vps.sh <IP_СЕРВЕРА> <ПОЛЬЗОВАТЕЛЬ> <ПАРОЛЬ> [ДОМЕН=bzal.by] [ПОРТ_SSH=22]"
  exit 1
fi

echo "==> [1/5] Проверка утилиты sshpass и архивация сборки..."
if ! command -v sshpass >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update -y && apt-get install -y sshpass rsync openssh-client
  fi
fi

# Собираем фронтенд локально, чтобы не нагружать процессор VPS при сборке
echo "==> [2/5] Локальная проверка и сборка фронтенда (vite build)..."
npm run build

# Упаковываем проект в архив (без node_modules и без перезаписи серверной папки data)
TAR_FILE="/tmp/bzal-release.tar.gz"
tar --exclude='./node_modules' \
    --exclude='./.git' \
    --exclude='./.aistudio' \
    --exclude='./data/bzal_server_db.json' \
    --exclude='./data/bzal_cms_db.json' \
    --exclude='./data/bzal_admin_auth.json' \
    -czf "$TAR_FILE" .

SSH_OPTS="-p ${SSH_PORT} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=20"
SCP_OPTS="-P ${SSH_PORT} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=20"

echo "==> [3/5] Копирование релиза на сервер ${VPS_USER}@${VPS_HOST}:${REMOTE_DIR} (порт ${SSH_PORT})..."
sshpass -p "$VPS_PASS" ssh $SSH_OPTS "${VPS_USER}@${VPS_HOST}" "mkdir -p ${REMOTE_DIR}/data ${REMOTE_DIR}/public/images/uploads"
sshpass -p "$VPS_PASS" scp $SCP_OPTS "$TAR_FILE" "${VPS_USER}@${VPS_HOST}:/tmp/bzal-release.tar.gz"

echo "==> [4/5] Установка окружения (Node.js 22 + PM2 + Nginx) и запуск сервиса на VPS..."
sshpass -p "$VPS_PASS" ssh $SSH_OPTS "${VPS_USER}@${VPS_HOST}" "bash -s" <<EOF
set -e
export DEBIAN_FRONTEND=noninteractive

# 1. Установка базовых пакетов и Nginx
if command -v apt-get >/dev/null 2>&1; then
  apt-get update -y
  apt-get install -y curl ca-certificates gnupg nginx ufw
fi

# 2. Установка Node.js 22 LTS (если не установлен или версия ниже 20)
if ! command -v node >/dev/null 2>&1 || [ "\$(node -v | cut -d. -f1 | tr -d 'v')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

# 3. Установка PM2 для бесперебойной работы и автозапуска при перезагрузке VPS
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

# 4. Распаковка проекта с сохранением существующих заявок и CMS-файлов в data/
cd ${REMOTE_DIR}
tar -xzf /tmp/bzal-release.tar.gz -C ${REMOTE_DIR}
rm -f /tmp/bzal-release.tar.gz

# Создание .env, если его ещё нет на сервере
if [ ! -f "${REMOTE_DIR}/.env" ] && [ -f "${REMOTE_DIR}/.env.example" ]; then
  cp "${REMOTE_DIR}/.env.example" "${REMOTE_DIR}/.env"
fi

# 5. Установка зависимостей и пересборка при необходимости
npm install --legacy-peer-deps
if [ ! -d "${REMOTE_DIR}/dist" ]; then
  npm run build
fi

# 6. Запуск / перезапуск через PM2 и добавление в автозагрузку systemd
pm2 delete technopark-bzal-portal >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u ${VPS_USER} --hp /root >/dev/null 2>&1 || true

# 7. Настройка Nginx Reverse Proxy (порт 80 -> 127.0.0.1:3000 для bzal.by и прямого IP)
cp ${REMOTE_DIR}/deploy/nginx-bzal.conf /etc/nginx/sites-available/bzal.conf
ln -sf /etc/nginx/sites-available/bzal.conf /etc/nginx/sites-enabled/bzal.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx && systemctl enable nginx

# 8. Выпуск SSL Let's Encrypt для bzal.by (если A-запись домена уже направлена на этот IP)
if [ "${DOMAIN}" != "_" ] && [ -n "${DOMAIN}" ]; then
  if command -v apt-get >/dev/null 2>&1; then
    apt-get install -y certbot python3-certbot-nginx || true
    certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos --register-unsafely-without-email --redirect || echo "Примечание: DNS A-запись для ${DOMAIN} ещё не указывает на этот IP. Сайт уже работает по HTTP (по IP и домену), SSL включится после переключения A-записи."
  fi
fi
EOF

echo "==> [5/5] Проверка работоспособности сервера (/api/health)..."
sleep 2
sshpass -p "$VPS_PASS" ssh $SSH_OPTS "${VPS_USER}@${VPS_HOST}" "curl -s http://127.0.0.1:3000/api/health"
echo ""
echo "============================================================================="
echo "✅ ДЕПЛОЙ УСПЕШНО ЗАВЕРШЁН!"
if [ "$DOMAIN" != "_" ] && [ -n "$DOMAIN" ]; then
  echo "🌐 Сайт доступен по адресу: https://${DOMAIN} (и http://${VPS_HOST})"
else
  echo "🌐 Сайт доступен по адресу: http://${VPS_HOST}"
fi
echo "============================================================================="

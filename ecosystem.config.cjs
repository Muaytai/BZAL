module.exports = {
  apps: [
    {
      name: 'technopark-bzal-portal',
      script: './node_modules/.bin/tsx',
      args: 'server.ts',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};

module.exports = {
  apps: [
    {
      name: 'incarnaxion',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        "NUXT_APP_BASE_URL": "/incarnaxion",
        "PORT": 3005
      }
    }
  ]
}
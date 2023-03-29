module.exports = {
  apps: [
    {
      name: 'incarnaxion',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
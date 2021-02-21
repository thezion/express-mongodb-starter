// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
    name: 'Express.js',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    restart_delay: 60000,
};

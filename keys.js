if(process.env.NODE_ENV == 'dev'){
    module.exports = require('./config/dev')
}

if(process.env.NODE_ENV == 'ci'){
    module.exports = require('./config/ci')
}
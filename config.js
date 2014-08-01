var Store = require('nitrogen-leveldb-store');

var config = {
//    host: 'localhost',
//    http_port: 3030,
//    protocol: 'http',

    api_key: process.env.API_KEY,
};

config.store = new Store(config);

module.exports = config;
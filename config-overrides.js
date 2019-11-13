const path = require('path');
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    let alias = config.resolve.alias;
    alias = {"@": path.resolve(__dirname, 'src'), ...alias}
    config.resolve.alias=alias;
    return config;
}
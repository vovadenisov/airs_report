var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

try {
    var devServerConfig = require('./devserver.local.config');
} catch (ex) {
    var devServerConfig = require('./devserver.base.config');
}

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: false
}).listen(devServerConfig.port, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at 0.0.0.0:' + devServerConfig.port);
});

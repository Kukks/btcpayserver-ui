module.exports = {
    publicPath: '',
    devServer: {
        public: process.env.DEVSERVER_PUBLIC
    },
    pluginOptions: {
        cordovaPath: 'src-cordova'
    }
}

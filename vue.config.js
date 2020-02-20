module.exports = {
    publicPath: '',
    devServer: {
        public: process.env.CORDOVA_PLATFORM? process.env.DEVSERVER_PUBLIC: ""
    },
    pluginOptions: {
        cordovaPath: 'src-cordova'
    }
}

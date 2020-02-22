module.exports = {
    publicPath: '',
    devServer: {
        public: process.env.CORDOVA_PLATFORM ? process.env.DEVSERVER_PUBLIC : ""
    },
    pluginOptions: {
        cordovaPath: 'src-cordova'
    },
    chainWebpack: config => {
        config.module
            .rule('ts')
            .use("ts-loader")
            .loader("ts-loader")
            .tap(options => {
                options.compiler = "ttypescript";
                return options
        });

        config.module
            .rule('tsx')
            .use("ts-loader")
            .loader("ts-loader")
            .tap(options => {
                options.compiler = "ttypescript";
                return options
            });
    }
};



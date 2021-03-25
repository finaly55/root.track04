//vue.config.js
module.exports = {
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].title = "Root Track 04";
            return args;
        });
    },
};
export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: "spa",  // universal
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    // target: "static",
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
            }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
    /*
     ** Global CSS
     */
    css: ["element-ui/lib/theme-chalk/index.css", "@/assets/css/base.css"],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        { src: '@/plugins/axios', ssr: true },
        "@/plugins/element-ui",
        { src: "@/plugins/v-charts", ssr: false },
        { src: "@/plugins/icons", ssr: false },
        {
            src: '@/plugins/wx',
            ssr: false
        },
        {
            src: '@/plugins/bridge',
            ssr: false
        }
    ],
    router: {
        base: process.env.NODE_ENV === 'production'
            ? '/dh-apph5/h5editor/' : '' // 此路径为dev 和 generate生成的根目录，如果有具体目录需求按实际情况写
        // middleware: 'titles'
    },
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        ['@nuxtjs/proxy', { pathRewrite: { '^/sso' : '/sso' } }],
    ],
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    axios: {
        proxy: true // Can be also an object with default options
    },
    proxy: {
        
    },
    dev: {
        devtool: 'cheap-module-eval-source-map',
        https:true
    },
    devServer: {
        https: true
    },
    generate: {
        dir: 'sso'
    },
    build: {
        transpile: [/^element-ui/, "vue-echarts", "resize-detector"],
        extend(config, ctx) {
            // Run ESLint on save
            // if (ctx.isDev && ctx.isClient) {
            //     config.module.rules.push({
            //         enforce: 'pre',
            //         test: /\.(js|vue)$/,
            //         loader: 'eslint-loader',
            //         exclude: /(node_modules)/
            //     });
            // }
            // 排除 nuxt 原配置的影响
            const { resolve } = require('path');
            const svgRule = config.module.rules.find(rule =>
                rule.test.test('.svg')
            );
            svgRule.exclude = [resolve(__dirname, './assets/svg')];
            // set svg-sprite-loader
            config.module.rules.push({
                test: /\.svg$/,
                include: [resolve(__dirname, './assets/svg')],
                // outputPath: 'icons/svg/',
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: { symbolId: 'icon-[name]' }
                    }
                ]
            });
        }
    }
};

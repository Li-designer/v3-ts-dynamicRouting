import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import path, { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import * as process from "process";
const root: string = process.cwd();
// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    base: command !== "serve" ? "/" : "/",
    root,
    // 服务端渲染
    server: {
      hmr: {
        overlay: false
      },
      // 是否开启 https
      https: false,
      // 端口号
      port: 9527,
      host: "0.0.0.0",
      open: true,
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        "/expert-adventure": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/expert-adventure/, "/expert-adventure")
        },
        "/apifox": {
          target: "http://127.0.0.1:4523/m1/2209443-0-default",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/apifox/, "/apifox")
        }
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()]
      }),
      AutoImport({
        // targets to transform
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],

        // global imports to register
        imports: [
          // 插件预设支持导入的api
          "vue",
          "vue-router",
          "pinia"
          // 自定义导入的api
        ],

        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: false, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

        // Filepath to generate corresponding .d.ts file.
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: "./auto-imports.d.ts"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src") // src 路径
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, //注意，这一句是在less对象中，写在外边不起作用
          modifyVars: {
            //在这里进行主题的修改，参考官方配置属性
            "@primary-color": "#1890ff",
            "@link-color": "#1890ff", // 链接色
            "@success-color": "#52c41a", // 成功色
            "@warning-color": "#faad14", // 警告色
            "@error-color": "#f5222d", // 错误色
            "@font-size-base": "14px", // 主字号
            "@heading-color": "rgba(0, 0, 0, 0.85)", // 标题色
            "@text-color": "rgba(0, 0, 0, 0.65)", // 主文本色
            "@text-color-secondary": "rgba(0, 0, 0, 0.45)", // 次文本色
            "@disabled-color": "rgba(0, 0, 0, 0.25)", // 失效色
            "@border-radius-base": "2px", // 组件/浮层圆角
            "@border-color-base": "#d9d9d9", // 边框色
            "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)" // 浮层阴影
          }
        },
        scss: {
          additionalData: `@import "./src/styles/mixins.scss";`
        }
      }
    }
  };
};

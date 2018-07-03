# element-ui-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

1. 安装项目依赖

    ``` bash
    cnpm install -D url-loader
    cnpm install -S element-ui
    ```
2. 配置webpack

    ``` javascript
    {
        test: /\.(eot|ttf|woff|woff2|svgz)(\?.+)?$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }]
    }

    ```
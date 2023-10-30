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

## WebPack5搭建Vue2

参考：

- [使用Webpack5创建Vue2项目及优化](https://cloud.tencent.com/developer/article/2125533)
- [示例模板](https://github.com/Paulinho89/webpack5-single-template)

## 常见问题

- Webpack5中el-ui的table无法显示，更换为webpack4
```json
"babel-loader": "^8.3.0",
"copy-webpack-plugin": "^6.4.1",
"css-loader": "^5.2.7",
"html-webpack-plugin": "^4.5.2",
"style-loader": "^2.0.0",
"vue-loader": "^15.11.1",
```

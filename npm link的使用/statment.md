npm config get prefix
- cd npm-link-module
- npm link

```
npm-link-module会根据package.json上的配置，被链接到全局，路径是{prefix}/lib/node_modules/<package>，这是官方文档上的描述，我们可以使用npm config get prefix命令获取到prefix的值
```
// https://juejin.cn/post/6945994800898244645
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const { SyncHook } = require('tapable');

module.exports = class Compiler {
    constructor(config) {
        this.config = config
        this.entry = config.entry
        this.output = config.output
        this.execPath = process.cwd() // Node.js 进程的当前工作目录，在这里也就是项目根目录
        this.modules = Object.create(null)
        this.hooks = {
            emit: new SyncHook(),
            afterEmit: new SyncHook(),
            before: new SyncHook()
        }
        const plugins = this.config.plugins
        if(Array.isArray(plugins)){
            plugins.forEach((plugin) => {
                plugin.do(this)
            })
        }
    }
    getModuleInfo = file => {
        const body = fs.readFileSync(file, 'utf-8')
        const sourceCode = this.initLoader(file)
        const ast = parser.parse(sourceCode, {
        sourceType: 'module' 
        })
        const deps = {}

        traverse(ast, {
            ImportDeclaration({ node }) {
                const dirname = path.dirname(file);
                const absPath = path.join(dirname, node.source.value)
                node.source.value = absPath
                deps[node.source.value] = absPath
            }
        })

        const { code } = babel.transformFromAstSync(ast, null, {
            presets: ["@babel/preset-env"],
            babelrc: false,
            configFile: false
        })
        const moduleInfo = { file, deps, code }
        return moduleInfo
    }

    buildModule = file => {
        const depsGraph = {}
        const entry = this.getModuleInfo(file)
        const temp = [entry]
        for (let i = 0; i < temp.length; i++) {
            const element = temp[i];
            const deps = element.deps
            if (deps) {
                for (const key in deps) {
                    if (Object.hasOwnProperty.call(deps, key)) {
                        temp.push(this.getModuleInfo(deps[key]))
                    }
                }
            }
        }
        temp.forEach(moduleInfo => {
            depsGraph[moduleInfo.file] = {
                deps: moduleInfo.deps,
                code: moduleInfo.code
            }
        })
        console.log(depsGraph);
        return depsGraph
    }
    initLoader (filename) {
        let source = fs.readFileSync(filename, 'utf-8')
        const rules = this.config.module && this.config.module.rules
        rules && rules.forEach((rule) => {
            const { test, use } = rule
            let l = use.length - 1
            if (test.test(filename)) {
                function execLoader() {

                    const loader = require(use[l--])
                    source = loader(source)

                    if (l >= 0) {
                        execLoader() 
                    }
                }
                execLoader()
            }
        })
        return source
    }
    run () {
        this.hooks.before.call() // 初始化完成进入编译的勾子
        this.buildModule(this.entry)
        this.hooks.emit.call() // 生成资源到 output 文件之前，发布emit钩子
        this.outFile()
        this.hooks.afterEmit.call('dadada') // 生成资源到 output 文件之后，发布afterEmit钩子
    }
    outFile(file) {
        fs.mkdirSync('./dist')
        fs.writeFileSync(this.output, this.emitFile(this.entry))
    }
    emitFile = file => {
        const modulesMap = this.buildModule(file)
        const modules = Object.keys(modulesMap).reduce((tot, cur) => {
            return tot += `'${cur}': function(require, module, exports) {
              ${modulesMap[cur].code}
            },`
        }, '')
    
        return `(function(modules){
            var installedModules = {}
    
            function require(filename){
    
                if(installedModules[filename]) {
                    return installedModules[filename].exports;		
                }
    
                var fn = modules[filename]
                var module = installedModules[filename] = { 
                    exports: {}
                }
                fn(require, module, module.exports)
                return module.exports
            }
            require('${file}')
          })({
            ${modules}
          })`
    }
}

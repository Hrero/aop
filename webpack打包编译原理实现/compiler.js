// https://juejin.cn/post/6945994800898244645
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

module.exports = class Compiler {
    constructor(config) {
        this.config = config
        this.entry = config.entry
        this.output = config.output
        this.execPath = process.cwd() // Node.js 进程的当前工作目录，在这里也就是项目根目录
        this.modules = Object.create(null)
    }
    getModuleInfo = file => {
        const body = fs.readFileSync(file, 'utf-8')
        const ast = parser.parse(body, {
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
    run () {
        this.buildModule(this.entry)
        this.outFile()
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

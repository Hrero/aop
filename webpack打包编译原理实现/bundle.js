// https://juejin.cn/post/6844904146827476999
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const supplyPath = (file) => {
    return path.join(__dirname, file)
}

const getModuleInfo = file => {
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

const parseModules = file => {
    const depsGraph = {}
    const entry = getModuleInfo(file)
    const temp = [entry]
    for (let i = 0; i < temp.length; i++) {
        const element = temp[i];
        const deps = element.deps
        if (deps) {
            for (const key in deps) {
                if (Object.hasOwnProperty.call(deps, key)) {
                    temp.push(getModuleInfo(deps[key]))
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

const emitFile = file => {
    const modulesMap = parseModules(file)
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
const Compiler = require('./compiler')
new Compiler({
    entry: './src/index.js',
    output: 'dist/bundle.js'
}).run()
// const content = emitFile('./src/index.js')
// fs.mkdirSync('./dist')
// fs.writeFileSync('./dist/bundle.js', content)
// console.log(content);
// parseModules('./src/index.js')


// getModuleInfo(supplyPath('./src/index.js'))

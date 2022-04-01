const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

class HtmlPlugin{
    constructor(options) {
        this.template = options.template  //解析参数
        this.filename = options.filename
    }
    do (compiler) {
        compiler.hooks.afterEmit.tap('afterEmit', (data) => {
            console.log(compiler.data, 'data');
            const template = fs.readFileSync(path.resolve(process.cwd(), this.template), 'utf-8')    
            const $ = cheerio.load(template)
      
            const script = $(`<script src='./${compiler.output}'></script>`)
            $('body').append(script)
            
            const htmlFile = $.html()
            const output = path.resolve(process.cwd(), this.filename)  
            fs.writeFileSync(output, htmlFile, 'utf-8')
        })
    }
}

module.exports = HtmlPlugin

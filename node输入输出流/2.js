const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
})

function ask(question) {
    rl.question(question, (answer) => {
        rl.write(`The answer received:  ${answer}\n`)

        ask(question)
    })
}

ask("What is your name: ")

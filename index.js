const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv').config()
const express = require('express')
const server = express()

const config = new Configuration({
    organization: process.env.MY_ORG,
    apiKey: process.env.OPENAI_KEY
})
const ai = new OpenAIApi(config)

const ask = async (question) => {
    console.log("thinking...")
    const completion = await ai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'user', content: question}
        ]
    }).catch(err => console.log("Unable to fetch data"))

    const result = completion.data.choices[0].message.content

    return `${result}`
}

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/views'))
server.set('view engine', 'ejs')

server.get('/', (req, res) => {
    res.render('index')
})

server.post('/', async (req, res) => {
    const question = req.body.question
    const result = (await ask(question)).split('\n')
    console.log(result)
    
    res.render('index', { ai: result, user: question})

})

server.listen(3000)
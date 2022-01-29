const express = require('express')

const app1 = express()
const app2 = express()
const app3 = express()

const mainHandler = num => (req, res) => {
    res.send(`<h1>안녕하세요 ${num} 번 서버입니다.</h1>`)
}

app1.get('/', mainHandler(1))
app2.get('/', mainHandler(2))
app3.get('/', mainHandler(3))

const errHandler = num => err => {
    err ?
    console.log(`${num} 번 서버 시작 실패`):
    console.log(`${num} 번 서버 시작`)    
}

app1.listen(3000, errHandler(1))
app2.listen(3001, errHandler(2))
app3.listen(3002, errHandler(3))
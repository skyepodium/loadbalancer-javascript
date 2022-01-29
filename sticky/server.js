// 1. 서버 구성에 사용할 express
const express = require('express')

// 2. 서버 3개 생성
const app1 = express()
const app2 = express()
const app3 = express()

app1.use(express.json())
app1.use(express.urlencoded({ extended: false }))
app2.use(express.json())
app2.use(express.urlencoded({ extended: false }))
app3.use(express.json())
app3.use(express.urlencoded({ extended: false }))

// 3. 응답 내용 구성
const mainHandler = num => (req, res) => {
    res.send(`<h1>안녕하세요 ${num} 번 서버입니다.</h1><h2><a href="/login">로그인</a></h2>`)
}

const loginTemplateHandler = num => (req, res) => {
    const loginTemplate = `
        <h1>안녕하세요 ${num} 번 서버입니다.</h1>
        <form action="/login" method="POST">
            <input name="id">
            <input name="password" type="password">
            <input type="submit" value="전송">
        </form>
    ` 
    res.send(loginTemplate)
}

const loginHandler = num => (req, res) => {
    const { id } = req.body

    res.set({
        'Set-Cookie': `name=${id}`
      })
     
    res.send(`<h1>${num} 서버 <a href="/">메인페이저로 돌아가기</a<</h1>`)
}

// 4. 메인 url로 요청이 오면 응답 내용 반환
app1.get('/', mainHandler(1))
app2.get('/', mainHandler(2))
app3.get('/', mainHandler(3))

app1.get('/login', loginTemplateHandler(1))
app2.get('/login', loginTemplateHandler(2))
app3.get('/login', loginTemplateHandler(3))

app1.post('/login', loginHandler(1))
app2.post('/login', loginHandler(2))
app3.post('/login', loginHandler(3))

// 5. 서버 시작 메시지
const errHandler = num => err => {
    err ?
    console.log(`${num} 번 서버 시작 실패`):
    console.log(`${num} 번 서버 시작`)    
}

// 6. 서버 시작
app1.listen(3000, errHandler(1))
app2.listen(3001, errHandler(2))
app3.listen(3002, errHandler(3))
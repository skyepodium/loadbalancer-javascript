// 1. 서버 구성에 사용할 express, http 요청에 사용할 axios
const express = require('express')
const axios = require('axios')

// 2. 인스턴스 생성
const loadBalancer = express()

// 3. 앞에서 만든 서버 등록
let idx = 0
const serverList = [
    '127.0.0.1:3000',
    '127.0.0.1:3001',
    '127.0.0.1:3002',
]

// 파비콘 요청은 따로 분리
loadBalancer.get('/favicon.ico', (req, res) => {
    res.status(204)
})

// 4. 요청 핸들러 작성
loadBalancer.get("*", (req, res) => {
    const { method, protocol, originalUrl } = req

    // 라운드 로빈
    // 1) 요청이 오면 서버 목록에서 인덱스 하나씩 증가하면서 분배
    const target = serverList[idx++]
    if(idx >= serverList.length) idx = 0

    // 2) 요청을 받을 서버 url 작성
    const requestUrl = `${protocol}://${target}${originalUrl}`

    // 3) http 응답 발송
    axios.request(requestUrl, {
        method
    })
        // 4) 결과 받으면, header 설정 후 반환
        .then(result => {
            res.set({...result.headers})
            res.send(result.data)
        })
        .catch(error => {
            res.set({...error.headers})
            res.send(error)
        })
})

// 5. 로드 밸런서 시작
loadBalancer.listen(80, err =>{
    err ?
    console.log('로드 밸런서 80번 포트에서 시작 실패'):
    console.log('로드 밸런서 80번 포트에서 시작')
})
const express = require('express')
const axios = require('axios')

const loadBalancer = express()

let idx = 0
const serverList = [
    '127.0.0.1:3000',
    '127.0.0.1:3001',
    '127.0.0.1:3002',
]

loadBalancer.get('/favicon.ico', (req, res) => {
    res.status(204)
})

loadBalancer.get("*", (req, res) => {
    const { method, protocol, originalUrl } = req

    const target = serverList[idx++]
    if(idx >= serverList.length) idx = 0

    const requestUrl = `${protocol}://${target}${originalUrl}`
    console.log('requestUrl', requestUrl)
    axios.request(requestUrl, {
        method
    })
        .then(result => {
            res.set({...result.headers})
            res.send(result.data)
        })
        .catch(error => {
            res.send(error)
        })
})

loadBalancer.listen(80, err =>{
    err ?
    console.log('로드 밸런서 80번 포트에서 시작 실패'):
    console.log('로드 밸런서 80번 포트에서 시작')
})
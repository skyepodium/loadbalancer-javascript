const axios = require('axios')
const express = require('express')
const app = express()


app.all('*', (req, res) => {
    const { method } = req
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    console.log('fullUrl', fullUrl)
    axios.request(`${fullUrl}`, {
        method,
    })
        .then(result => {
            res.set({...result.headers})
            res.send(result.data)
        })
        .catch(error => {
            res.send(error)
        })
})

app.listen(8080, err =>{
    err ?
    console.log("서버 8080 시작 실패"):
    console.log("서버 8080에서 시작");
});
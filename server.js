const axios = require('axios');
const express = require('express');
const loadBalancer = express();
const app1 = express();
const app2 = express();
const app3 = express();

let idx = 0;
const serverList = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002'
]

loadBalancer.get("*", (req, res) => {
    const { method, protocol, originalUrl } = req

    const target = serverList[idx++];
    if(idx >= serverList.length) idx = 0

    const requestUrl = `${protocol}://${target}${originalUrl}`

    axios.request(requestUrl, {
        method,
    })
        .then(result => {
            console.log('result', result.headers)
            res.set({...result.headers})
            res.send(result.data)
        })
        .catch(error => {
            res.send(error)
        })
})

loadBalancer.listen(2000, err =>{
    err ?
    console.log("Failed to listen on PORT 80"):
    console.log("Application Server listening on PORT 80");
})


const handler = num => (req,res)=>{
    console.log('method', req.method)
    console.log('host', req.headers.host)
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip); // ip address of 
    console.log("req.headers['x-forwarded-for'],", req.headers['x-forwarded-for'])
    console.log('req.connection.remoteAddress', req.connection.remoteAddress)
    console.log('req.connection.remotePort', req.connection.remotePort)
    console.log('req.connection.localAddress', req.connection.localAddress)
    console.log('req.connection.localPort', req.connection.localPort)
    console.log("num!!!!!!    ", num)
    console.log('session', req.session)

    res.set({
        'ETag': '123456',
        'hi': 'hi',
        'Set-Cookie': 'name=12345'
      })
    res.send('Response from server ' + num);
}


 
// Only handle GET and POST requests
// Receive request aand pass to handler method
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));
app3.get('*', handler(3)).post('*', handler(3));
 
// Start server on PORT 3000
app1.listen(3000, err =>{
    err ?
    console.log("Failed to listen on PORT 3000"):
    console.log("Application Server listening on PORT 3000");
});
 
// Start server on PORT 3001
app2.listen(3001, err =>{
    err ?
    console.log("Failed to listen on PORT 3001"):
    console.log("Application Server listening on PORT 3001");
});

// Start server on PORT 3001
app3.listen(3002, err =>{
    err ?
    console.log("Failed to listen on PORT 3002"):
    console.log("Application Server listening on PORT 3002");
});
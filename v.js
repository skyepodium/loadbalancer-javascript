const http = require('http')

const server = http.createServer((req, res) => {
    console.log('req', req)
})



server.listen(8080, () => console.log("✔success : http://localhost:8080"));
server.on("error", err => console.warn(err));
const axios = require('axios')

const express = require('express');
const app1 = express();

const getRequest = () => {
    axios.get("http://localhost:3001")
    .then(res => {
        console.log('res', res)
    })
    .catch(err => {
        console.log('err', err)
    })    
}
 
// Only handle GET and POST requests
// Receive request aand pass to handler method
app1.get('*', () => {
    getRequest()
})

// Start server on PORT 3000
app1.listen(4000, err =>{

});



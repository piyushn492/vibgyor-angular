const express = require('express');
path = require('path')
const app = express();


let port = process.env.PORT || 4200

app.listen(port, function(){
    console.log("Server is running on port "+port);
})

app.use(express.static(__dirname + '/dist/vibgyor-app'));
app.get('/*', (req,res) => {
res.sendFile(path.join(__dirname + '/dist/vibgyor-app/index.html'))});
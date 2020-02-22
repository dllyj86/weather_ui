const express = require('express');
const path = require('path');

const app = express();

const defaultPath = path.join(__dirname, 'dist');
app.use(express.static(defaultPath));

// app.get('/*', function(req, res){
//     res.sendFile(path.join(__dirname, 'dist') + '/index.html');
// });

app.listen(3300, function() {
    console.log("Express satart successfully at port 3300");
});


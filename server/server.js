const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log('Server is running on localhost: ', PORT);
})


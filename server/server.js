const express = require('express');
const bodyParser = require('body-parser');
//const tasks = require('./modules/routes/task.router');
const app = express();
const PORT = 5000;
require('./database-connection');


app.use(express.static('server/public'));
app.use(bodyParser.json());
//app.use('/tasks', tasks);

app.listen(PORT, () => {
    console.log('Server is running on localhost: ', PORT);
})


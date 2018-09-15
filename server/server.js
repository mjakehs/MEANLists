const express = require('express');
const bodyParser = require('body-parser');
const tasks = require('./modules/routes/task.router');
const lists = require('./modules/routes/list.router');
const app = express();
const PORT = 5000;
require('./database-connection');


app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/tasks', tasks);
app.use('/lists', lists);

app.listen(PORT, () => {
    console.log('Server is running on localhost: ', PORT);
})


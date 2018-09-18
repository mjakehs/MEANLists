const mongoose = require('mongoose');
const databaseURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasklist';
mongoose.connect(databaseURL, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log('Connected to database at: ', databaseURL);
})
mongoose.connection.on('error', (error) => {
    console.log('Error connection to database: ', error);
})


const mongoose = require('mongoose');



exports.connect = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to the database');
    }).catch((err) => {
        console.log('Error connecting to the database');
        console.log(err);
    });
} 
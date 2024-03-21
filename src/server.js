const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes/userRoutes');
const app = express();

//middlewares:
app.use(express.json());
app.use(cors());

// server health checking route:
app.get('/health', (req, res) => {
    res.send('custom form server is running on 5000....')
});


// routes:
app.use('/users', userRoute)



// error handler function:
app.all('*', (req, res, next) => {
    const error = new Error(`Your Requested URL Invalid [${req.url}]`);
    next(error);
});

app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({ Message: error.message })
    }
});

// database connection:

const dbConnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3g7cuab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { dbName: `${process.env.DB}` })
        // await mongoose.connect('mongodb+srv://IrfanKhan:D44SckjJZ7Gep4iH@cluster0.3g7cuab.mongodb.net/', { dbName: 'FORM-APP_DB' })
        console.log('server connected with Database...')
    } catch (error) {
        console.log('server - Database connection failed...',error)

    }
};

dbConnect();


app.listen(5000, () => {
    console.log(' custom form application server is running on 5000')
})
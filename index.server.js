const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
//const { json } = require('body-parser');

//environment variable or constant
env.config();

//mongoDb connection
//mongodb+srv://admin:<password>@cluster0.uv3jg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.uv3jg.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    ).then(() => {
        console.log('Database Connected');
    });
    app.use(bodyParser.json());
    
    //bodyparser is updated:
    //app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', authRoutes);
    app.use('/api', adminRoutes);

app.get('/', (req, res, next) => {
  res.status(200).json({
      message: 'hello from server'      
  });
});

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });
  });
  

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



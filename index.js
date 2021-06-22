/**
   * This is the main entery point for the api.
   *  {@link link
    name}
    * @author Author/Ntokungwia Zidane
    * @date Aug 10/2020
    * Contributors : contributor name,
 **/


// all required modules
const express = require('express');
const app = express();
const process = require('process');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();


// extablishing the connectoin to the database 
//YOUR_MONGOdB_DATABASE_CONNECTION_LINK

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log('Connected to Database');
  }
});
// auth 

// some midlewares
app.use(express.json());
app.use(cors())
// routes importing
const userRouter = require('./Routes/userRouter');
const adminRouter = require('./Routes/adminRouter');

// using the routers
app.use('/user', userRouter);

app.use('/admin', adminRouter);

app.get('/', (req, res) => { res.send('Welcome to Activa cost app backend') })

// starting the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Your api is Running on port : ${port}`);
})
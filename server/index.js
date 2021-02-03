import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';

import memoryRoute from './routs/memories.js';
import userRouter from './routs/user.js';

const app =  express();

app.use(bodyParser.json({limt:"30mb", extended :true }));
app.use(bodyParser.urlencoded({limt:"30mb", extended :true }));
app.use(cors());

app.use('/memories', memoryRoute)
app.use("/user", userRouter);

const CONNECTION_URL  = 'mongodb+srv://nuha_:picsApp123@cluster0.llarx.mongodb.net/picsApp?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect (CONNECTION_URL, {useNewUrlParser:true ,useCreateIndex: true, useUnifiedTopology:true})
.then(()=> app.listen(PORT,()=>console.log(`server running on port ${PORT}`)))
.catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify' , false)

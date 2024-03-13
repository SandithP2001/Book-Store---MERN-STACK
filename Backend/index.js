import express, { request, response } from "express";
import mongoose  from "mongoose";


//import from config.js
import { PORT, mongoDBURL } from "./config.js";

//import bookSchema from bookModel.js
import { Book } from "./models/bookModel.js";

import booksRoute from './routes/booksRoute.js';

import cors from 'cors';

const app = express();


//Middleware for passing request body
app.use(express.json());



//  Middleware for handling CORS POLICY
//Option 1: Allow all origins with default of cors(*)
app.use(cors());

//Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome')
});




app.use('/books', booksRoute);







//checking the mongoDB connection successful or not
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the mongoDB database')
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) =>{
        console.log(error);
    })
import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import viewsRouter from './routes/views.routes.js';

import mongoose from "mongoose";
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/ecommerce', (err) => {
    if(err){
        console.log('Error al conectar a MongoDB', err)
    } else {
        console.log('Conectado a MongoDB')
    }
})

// handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartsRoutes);
app.use('/', viewsRouter);

app.listen(3000, () => console.log('Server up in port 3000'))


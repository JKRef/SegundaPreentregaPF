import { Router } from "express";
import cartsDao from "../daos/dbManager/carts.dao.js";
import productsDao from "../daos/dbManager/products.dao.js";
import __dirname from '../utils.js';

const router = Router();

router.get('/products', async (req, res) => {
    const {page, limit, sort, category, status} = req.query;
    const products = await productsDao.getAll({page, limit, sort, category, status})
    
    res.render('products', { products })
})

router.get('/products/:id', async (req, res) => {
    const product = await productsDao.getById(req.params.id)
    
    res.render('productDetails', { product })
})

router.get('/carts/:cid', async (req,res) => {
    const cart = await cartsDao.getCartByID(req.params.cid)

    console.log(cart)

    res.render('cart', { cart })
    
})


export default router;
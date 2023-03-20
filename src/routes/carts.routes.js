import cartsDao from "../daos/dbManager/carts.dao.js";
import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
    try{
        const cart = await cartsDao.createCart();
        res.json(cart);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const cart = await cartsDao.getCartByID(req.params.id);
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const data = req.body;

        const cart = await cartsDao.addProduct(req.params.id, data)
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.put('/:id/product/:pid', async (req, res) => {
    try {
        const quantity = Number.parseInt(req.body.quantity);
        console.log(quantity)
        const cart = await cartsDao.addQuantity(req.params.id, req.params.pid, quantity)
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/:id/product/:pid', async (req, res) => {
    try{
        const cart = await cartsDao.deleteProduct(req.params.id, req.params.pid);
        res.json(cart)
    }catch(err){
        res.status(500).json({ error: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const cart = await cartsDao.deleteAllProducts(req.params.id);
        res.json(cart)
    }catch(err){
        res.status(500).json({ error: err.message })
    }
})

export default router;
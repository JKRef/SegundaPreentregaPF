import productsDao from "../daos/dbManager/products.dao.js";
import { Router } from 'express';

const router = Router();

router.get('/', async(req, res) => {
    try {
        const products = await productsDao.getAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await productsDao.getById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const product = await productsDao.create(req.body);
        //res.json(product);
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const product = await productsDao.update(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const product = await productsDao.delete(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router;
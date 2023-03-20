import { cartModel } from "../../models/cart.model.js";

class CartDao {
    async createCart(){
        return await cartModel.create();
    }

    async getCartByID(id){
        return await cartModel.findOne({id});
    }

    async addProduct(cid, list){
        // Agrega productos al carrito, los productos deben estar dentro de una matriz para funcionar
        list.forEach( async (data) => {
            let {product, quantity} = data;
            const isInCart = await cartModel.findOne({_id: cid, "products.product": product})

            console.log(isInCart)

            if(!isInCart){
                // el producto no esta en el carrito
                await cartModel.findOneAndUpdate({_id: cid}, {$push: {products: {product: product, quantity: quantity || 1 }}});
            }else{
                // actualizar cantidad, si el producto esta en el carrito
                await cartModel.findOneAndUpdate({_id: cid, "products.product": product}, {$inc: {"products.$.quantity": quantity}})
            }
        })

        return await cartModel.find({_id: cid})
    }

    async addQuantity(cid, pid, qty){
        //modificar la cantidad del producto
        return await cartModel.findOneAndUpdate({_id: cid, "products.product": pid}, {$inc: {"products.$.quantity": qty}});
    }

    async deleteProduct(cid, pid){
        return await cartModel.findOneAndUpdate({_id: cid}, {$pull: {products: {product: pid}}})
    }

    async deleteAllProducts(cid){
        return await cartModel.findOneAndReplace({_id: cid}, {products: []});
    }
}

export default new CartDao();
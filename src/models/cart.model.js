import { Schema, model } from 'mongoose';
import { productModel } from './product.model.js';

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {type: Schema.Types.ObjectId, ref: 'products'},
                quantity: {type: Number}
            }
        ], default: []
    }
})

cartSchema.pre('findOne', function() {
    this.populate('products.product');
})

export const cartModel = model(cartCollection, cartSchema);

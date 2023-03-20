import { productModel } from "../../models/product.model.js"

class ProductDao {
    async getAll({limit=10, page=1, sort, category, status}){
        const sortValidValues = [-1, 1, '-1', '1']
        try{
            let query = {};
            if(category || status){
                query = {category} || {status}
            }

            if(isNaN(limit) || limit <= 0){
                throw 'Limit must be a number over 0'
            }

            if(isNaN(page)){
                throw 'Page is not a number';
            }
            
            if(sortValidValues.includes(sort)){
                return await productModel.paginate(query, {limit: limit, page: page, sort: { price: sort}})
            }else{
                if(sort){
                    throw 'Sort values can only be 1 or -1'
                }
            }
            return await productModel.paginate(query, {limit: limit || 10, page: page || 1})
            
        }catch(err){
            console.log(err)
        }
        
    }

    async getById(id){
        return await productModel.findById(id);
    }

    async create(data) {
        return await productModel.create(data)
    }

    async update(id, data){
        return await productModel.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id){
        return await productModel.findByIdAndDelete(id);
    }
}

export default new ProductDao();


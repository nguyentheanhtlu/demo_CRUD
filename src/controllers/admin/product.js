const ProductModel = require('../../models/product');
const CategoryModel = require('../../models/category');

class Product {
    async index(req, res, next) {
        try {
            let products = await ProductModel.find().populate('category');
            let message = req.flash('message');
            let error = req.flash('error');
            res.render('admin/products/list.ejs', {
                data: products,
                message: message,
                error: error
            });
        }catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try{
            let categories = await CategoryModel.find();
            let errors = req.flash('errors');
            console.log(errors)
            res.render('admin/products/add.ejs', {
                data: categories,
                errors: errors
            });
        }catch (e) {
            next(e)
        }

    }

    async store(req, res, next) {
        try {
            await ProductModel.create({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                image : req.files.image ? req.files.image.name : '',
                content: req.body.content,
            })
            if(req.files.image.name) {
                await req.files.image.mv('./public/uploads/' + req.files.image.name)
            }
            req.flash('message', 'Create product successfully!')
            res.redirect('/admin/products')


        }catch (e) {
            console.log(1234)
            let messageValidation = {
                name: e.errors['name'] ? e.errors['name'].message : '',
                price: e.errors['price'] ? e.errors['price'].message : ''
            }

            console.log(messageValidation)
            req.flash('errors', messageValidation)
            res.redirect('/admin/products/create')
        }
    }

    async delete(req, res, next) {
        try{
            let id = req.params.id;
            await ProductModel.deleteOne({
                _id: id
            })
            req.flash('message', 'Delete product successfully!')
        }catch (e) {
            req.flash('error', e.message)
        } finally {
            res.redirect('/admin/products')
        }
    }

    async search(req, res, next){
        try{
            let products =  await ProductModel.find(
                {
                    name: {$regex: req.query.keyword, $options: 'i'}
                }
            ).populate('category')

            res.status(200).json(products)
        }catch (e) {
            res.json({
                'error' : e.message
            })
        }

    }
    async showUpdateForm(req, res,next) {
        try {
            const product = await ProductModel.findOne({_id: req.params.id});
            const categories = await CategoryModel.find();
            if (product) {
                res.render("admin/products/update.ejs", {data: {product, categories}});
            } else {
                res.render('error')
            }
        } catch (e) {
            next(e)
        }

    }
    async update(req, res,next) {
        try {
            const product = await ProductModel.findOne({_id: req.params.id});
            console.log(product)
            product.name = req.body.name;
            product.description = req.body.description;
            product.content = req.body.content;
            product.price = req.body.price;
            product.image = req.files.image.name;
            product.category = req.body.category;
            await product.save();
            if (product) {
                res.redirect("/admin/products");
            } else {
                res.render("error");
            }
        } catch (err) {
            next(err);
        }
    }




}

module.exports = Product

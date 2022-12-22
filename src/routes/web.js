const express = require('express');
const DashboardController = require('../controllers/admin/dashboard')
const ProductController = require('../controllers/admin/product')
const AuthController = require('../controllers/admin/auth')
const multer  = require('multer')
const passport = require("../middlewares/auth");
const checkAuth = require("../middlewares/checkAuth");
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

const dashboardController = new DashboardController();
const productController = new ProductController();
const authController = new AuthController();

router.get('/admin/login', authController.showFormLogin)
router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash : true
}));

router.use(checkAuth)

router.get('/admin/dashboard', dashboardController.index)
router.get('/admin/products', productController.index);

const checkPermissions = function(req, res, next)  {
    if (req.user.role === 'admin') {
        next();
    }else {
        return res.send('error')
    }
}

router.use(checkPermissions);


router.get('/admin/products/create', productController.create);
router.post('/admin/products/create', productController.store);
router.get('/admin/products/:id/delete', productController.delete);
router.get('/admin/products/search', productController.search);
router.get('/admin/products/update/:id',productController.showUpdateForm);
router.post('/admin/products/update/:id',productController.update);

router.get('*', (req, res) => {
    res.render('admin/errors/404.ejs')
})

module.exports = router;

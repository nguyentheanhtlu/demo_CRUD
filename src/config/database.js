const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://theanh:theanh3012@theanh.ord0sxz.mongodb.net/ecommert').catch(err => {
    console.log('error database connection')
});


module.exports = mongoose;

const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String,  default: 'USER'},
    imgUrl: { type: String, required: false }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bycrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bycrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
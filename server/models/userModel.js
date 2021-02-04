import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    email: { type:String },
    userName: {
        type: String,
        requierd:true, 
    },
    password: {
        type: String,
        requierd:true,
    },
    imageFile: String,
    phone:String,
    id: { type: String },
    bio: {type: String},
})

export default mongoose.model('userModel', userSchema);


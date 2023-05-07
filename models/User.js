import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
    },

    img: {
        type: String,
    },

    city: {
        type: String,
    },

    phone: {
        type: String,
    }, 

    password:{
        type: String,
        required: true,
    },
    // isAdmin:{
    //     type: Boolean,
    //     default: false,
    // },
    role:{
        type: String,
    }
    
}, 
    {timestamps: true}
);

export default mongoose.model('User', UserSchema);
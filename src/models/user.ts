import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: 6
    },
    password:{
        type: String,
        trim: true
    }

});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model('User', userSchema) as any;
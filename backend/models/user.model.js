import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['guest', 'host', 'admin'],
        default: 'guest'
    },
    avatar: {
        type: String,
        default : 'default-avatar.png'
    },
    phone:{
        type : Number,
        trim : true
    },
    emailVerified: { 
        type : Boolean,
        default: false
    },
    isActive: { 
        type: Boolean,
        default: true
    },
    // For future features (OAuth, password reset, etc.)
    googleId: {
        type: String,
        sparse: true   // Allows null/undefined values without unique constraint
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
{
    timestamps: true
});

//used when updating profile like uploading dp, without this line simple profile updation will 
//fire password hashing when not equal locks away the user from account
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    profile_pic: String
}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {
    if(this.isNew) {
        this.password = bcrypt.hashSync(this.password);
    }
    next();
});

UserSchema.methods.comparePass = function(pass) {
    return bcrypt.compareSync(pass, this.password);
}

import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    profile_pic: { type: String, required: true}
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

import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    promotions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Promotion'
    }]
}, {
    timestamps: true
});

PostSchema.pre('save', function(next) {
    if(this.isNew) {
        this.slug = this.title.replace(/ /g,"_");
    }
    next();
});
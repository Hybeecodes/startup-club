import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const PromotionSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    promoter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medium: {
        type: String,
        enum: ['twitter', 'whatsapp', 'facebook', 'linkedin', 'instagram'],
        required: true
    }
}, {
    timestamps: true
});

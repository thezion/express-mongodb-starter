import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

/* === schema === */

const schema = new mongoose.Schema<UserDocument>({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    // group: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Group',
    //     default: null,
    // },
    ip: {
        type: String,
    },
    lastLogin: {
        type: Date,
    },
    createdAt: {
        type: Date,
    },
});

/* === methods === */

schema.pre<UserDocument>('save', async function preSave(next) {
    const model = this;

    // hash password
    if (model.isModified('password')) {
        model.password = await bcrypt.hash(model.password, 8);
    }
    next();
});

schema.methods.getJwt = function () {
    const model = this;
    const JWT_SECRET = process.env.JWT_SECRET || '';
    const data = { _id: model._id };
    return jsonwebtoken.sign(data, JWT_SECRET, { expiresIn: '7d' });
};

schema.methods.getBasicFields = function () {
    // if (this.group) {
    //     await this.populate('group').execPopulate();
    // }

    return {
        _id: this._id,
        username: this.username,
        email: this.email,
    };
};

/* === export === */
export interface UserModel extends Model<UserDocument> {}
export interface UserDocument extends User, Document {
    getJwt(): string;
    getBasicFields(): object;
}
export interface User {
    username: string;
    email: string;
    password: string;
    // group: Types.ObjectId;
    ip: string;
    lastLogin: Date;
    createdAt: Date;
}
export default mongoose.model<UserDocument, UserModel>('User', schema);

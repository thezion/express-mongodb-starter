import bcrypt from 'bcrypt';
import UserModel from '../models/User.model';

export async function signInWithPassword(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
        return null;
    }

    const passwordsDoMatch = await bcrypt.compare(password, user.password);
    if (!passwordsDoMatch) {
        return null;
    }

    user.lastLogin = new Date();
    await user.save();

    return user;
}

export async function getUserById(userId: string) {
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (error) {
        return null;
    }
}

export async function getUserList() {
    const users = await UserModel.find({}, null, { sort: { _id: 1 }, limit: 20 });
    return users;
}

export async function getUserCount() {
    const count = await UserModel.countDocuments();
    return count;
}

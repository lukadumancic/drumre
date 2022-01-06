import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: { type: String, default: null },
    facebookID: { type: String, default: null },
    name: String,
    surname: String,
    email: String,
    image: String,
    locale: String,
    likes: { type: Object, default: {} }
});

const Users = mongoose.model("users", userSchema);

export default Users;
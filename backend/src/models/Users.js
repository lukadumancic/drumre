import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    name: String,
    surname: String,
    email: String,
    image: String,
    locale: String,
});

const Users = mongoose.model("users", userSchema);

export default Users;
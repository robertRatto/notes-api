import { Schema, Model, model, Types } from 'mongoose';
import { User } from '../interfaces/user.interface';
 
const UserSchema = new Schema<User>(
    {
        name:{
            type: String,
            required: true
        }, 
        password:{
            type: String,
            required: true
        }, 
        email:{
            type: String,
            required: true,
            unique: true
        }, 
        description:{
            type: String
        }, 
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const UserModel = model('users', UserSchema);

export default UserModel;
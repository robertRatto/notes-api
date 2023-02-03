import { Auth } from "../interfaces/auth.interface"
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model"
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ( { email, password, name }: User) => {
    const checkIs = await UserModel.findOne({ email });
    if( checkIs ) return 'Alredy_user';
    const passHash = await encrypt(password);
    const registerNewUser = await UserModel.create({ email, password: passHash, name });
    return registerNewUser;
}

const loginUser = async ({email, password}: Auth) => {
    const checkIs = await UserModel.findOne({ email });
    if( !checkIs ) return 'User_not_found';
    
    //si el usuario existe
    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);

    //si la constraseña es incorrecta
    if(!isCorrect) return 'Password_incorrect';

    const token = await generateToken(email);
    const data = {
        token,
        user: checkIs
    }
    return data;

}

export { registerNewUser, loginUser}
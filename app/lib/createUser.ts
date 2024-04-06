import { usersList } from "./placeholder-data";
import { generateOTP } from "./utils";

const createUser = async (name: string, email: string, password: string | number) => {
    try {
        const existingUser = usersList.find((user: any) => user.email === email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const user = {
            id: usersList.length + 1,
            name,
            email,
            password,
            isVerified: false,
            otp: generateOTP()
        };
        const newUser = {
            id: usersList.length + 1,
            name,
            email,
            isVerified: false,
        }
        usersList.push(user);
        return { usersList, newUser};
    } catch (error) {
        throw error;
    }
};

export default createUser;
import { usersList } from "./placeholder-data";

const createUser = async (name: string, email: string, password: string | number) => {
    try {
        const existingUser = usersList.find((user: any) => user.email === email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const newUser = {
            id: usersList.length + 1, 
            name,
            email,
            password,
            isVerified: false
        };

        usersList.push(newUser);
        return {usersList, newUser};
    } catch (error) {
        throw error;
    }
};

export default createUser;
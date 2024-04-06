import axios from "axios";
import { BASE_URL } from "./utils";

export const sendEmail = async (email: string, verificationToken: string) => {
    const endPoint = `${BASE_URL}/api/send-email`;
    try {
        const response = await axios.post(endPoint, {
            email,
            verificationToken
        });

        if (response.status === 200) {
            console.log("Email sent successfully:", response.data);
        } else {
            throw new Error(`Failed to send email. Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error;
    }
};

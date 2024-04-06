import axios from "axios";

export const sendEmail = async (email: string, verificationToken: string) => {
    const endPoint = "/api/send-email"
    try {
        const response = await axios.post(endPoint, {
            body: JSON.stringify({ email, verificationToken })
        });
        if (response.status === 200) {
            return response
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
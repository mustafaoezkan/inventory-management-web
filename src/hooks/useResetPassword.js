import axios from "../components/api/axios";

const useResetPassword = () => {
    const resetPassword = async (id, sifre) => {
        try {
            const response = await axios.put(`/sifre/${id}`, {
                sifre: sifre,
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return { resetPassword };
}

export default useResetPassword;
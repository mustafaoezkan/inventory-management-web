import axios from "../components/api/axios";

const useResetPassword = () => {
    const resetPassword = async (id, sifre, email) => {
        try {
            const response = await axios.put(`/sifre/${id}`, {
                sifre: sifre,
                email: email,
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const forgotPassword = async (email, kullanici_adi) => {
        try {
            const response = await axios.post("/sifre/sifremi-unuttum", {
                email: email,
                kullanici_adi: kullanici_adi,
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return { resetPassword, forgotPassword };
}

export default useResetPassword;
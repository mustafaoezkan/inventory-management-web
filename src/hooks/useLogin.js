import axios from "../components/api/axios";

const useLogin = () => {
    const login = async (username, password) => {
        try {
            const response = await axios.post("giris", {
                kullanici_adi: username,
                sifre: password,
            });
            const token = response?.data?.token;
            localStorage.setItem("token", token);
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return { login };
}

export default useLogin;
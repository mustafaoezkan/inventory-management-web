import axios from "../components/api/axios";

const useLogin = () => {
    const login = async (username, password) => {
        try {
            const response = await axios.post("giris", {
                kullanici_adi: username,
                sifre: password,
            });
            const authentication = response.data.yetki[0].yetki;
            const token = response?.data?.token;
            localStorage.setItem("token", token);
            localStorage.setItem("authentication", authentication);
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return { login };
}

export default useLogin;
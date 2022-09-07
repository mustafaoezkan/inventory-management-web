import axios from "../components/api/axios";

const useLogin = () => {
    const login = async (username, password) => {
        try {
            const response = await axios.post("giris", {
                kullanici_adi: username,
                sifre: password,
            });
            const info = response.data.yetki;
            const authentication = response.data.yetki[0].yetki;
            const token = response?.data?.token;
            localStorage.setItem("token", token);
            localStorage.setItem("authentication", authentication);
            localStorage.setItem("info", JSON.stringify(info));
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return { login };
}

export default useLogin;
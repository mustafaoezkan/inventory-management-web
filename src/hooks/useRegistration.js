import axios from "../components/api/axios";

const useRegistration = () => {
    const registration = async (username, password, name, surname, email, number, registrationNumber, degree, authentication) => {
        try {
            const response = await axios.post("kullanici", {
                kullanici_adi: username,
                sifre: password,
                ad: name,
                soyad: surname,
                email: email,
                telefon: number,
                sicil_no: registrationNumber,
                unvan: degree,
                yetki: authentication,
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }
    return { registration };
}

export default useRegistration;
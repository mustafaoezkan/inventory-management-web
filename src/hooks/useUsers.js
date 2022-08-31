import axios from "../components/api/axios";

const useUsers = () => {
    const getUsers = async () => {
        try {
            const response = await axios.get('kullanici');
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const putUser = async (id, ad, soyad, email, telefon, sicil_no, unvan, yetki) => {
        try {
            const response = await axios.put(`kullanici/${id}`, {
                ad,
                soyad,
                email,
                telefon,
                sicil_no,
                unvan,
                yetki
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`kullanici/${id}`);
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return { getUsers, putUser, deleteUser };
}

export default useUsers;
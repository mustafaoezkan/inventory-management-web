import axios from "../components/api/axios";

const useCategory = () => {
    const getCategories = async () => {
        try {
            const response = await axios.get('kategori');
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const postCategory = async (isim) => {
        try {
            const response = await axios.post('kategori', {
                isim
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const putCategory = async (id, isim) => {
        try {
            const response = await axios.put(`kategori/${id}`, {
                isim
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`kategori/${id}`);
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return { getCategories, postCategory, putCategory, deleteCategory };
}

export default useCategory;
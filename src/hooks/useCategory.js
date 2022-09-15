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

    const getNotAssignCategoriesCount = async () => {
        try {
            const response = await axios.get('kategori/tahsis-edilmemis');
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const getAssignCategoriesCount = async () => {
        try {
            const response = await axios.get("kategori/tahsis-edilmis");
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const getCategoriesHaveProduct = async () => {
        try {
            const response = await axios.get("kategori/en-cok-urun");
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
            const response = await axios.put(`kategori/${id}/`, {
                isim
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`kategori/${id}/`, {
                // cors error
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }
            );
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return { getCategories, getAssignCategoriesCount, getNotAssignCategoriesCount, postCategory, putCategory, deleteCategory, getCategoriesHaveProduct };
}

export default useCategory;
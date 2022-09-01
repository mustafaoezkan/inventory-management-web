import axios from "../components/api/axios";

const useProduct = () => {
    const getProducts = async () => {
        try {
            const response = await axios.get("urun");
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const postProduct = async (seri_no, marka, model, boyut, renk, durum, aciklama, kategori_id) => {
        try {
            const response = await axios.post("urun", {
                seri_no,
                marka,
                model,
                boyut,
                renk,
                durum,
                aciklama,
                kategori_id
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const putProduct = async (id, seri_no, marka, model, boyut, renk, durum, aciklama, kategori_id) => {
        try {
            const response = await axios.put(`urun/${id}`, {
                seri_no,
                marka,
                model,
                boyut,
                renk,
                durum,
                aciklama,
                kategori_id
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`urun/${id}`, {
                id
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return { getProducts, postProduct, putProduct, deleteProduct };
}

export default useProduct;

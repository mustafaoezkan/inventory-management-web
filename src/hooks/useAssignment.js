import axios from "../components/api/axios";

const useAssignment = () => {
    const getAssignments = async () => {
        try {
            const response = await axios.get("tahsis");
            return response;
        } catch (err) {
            return err.response;
        }
    }

    const postAssignment = async (urun_id, tahsis_edilen_kisi, aciklama) => {
        try {
            const response = await axios.post("tahsis", {
                urun_id,
                tahsis_edilen_kisi,
                aciklama
            });
            return response;
        } catch (err) {
            return err.response;
        }
    }

    return {
        getAssignments,
        postAssignment
    };
}

export default useAssignment;
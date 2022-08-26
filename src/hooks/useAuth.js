import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.token ? "Giriş Yapıldı" : "Giriş Yapılmadı");
    return useContext(AuthContext);
}

export default useAuth;
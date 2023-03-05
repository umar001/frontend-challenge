import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { JWT_TOKEN } from "../utils/constants";
import { isTokenExpired } from "../utils/jwtUtil";
// import { useLocalStorage } from "./useLocalStorage";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useLocalStorage(JWT_TOKEN, userData);
    const navigate = useNavigate();

    const login = async (data) => {
        setUser(data);
        navigate("/", { replace: true });
    };
    const isAuthenticated = () => {
        if (user) {
            return !isTokenExpired(user)
        }
        return false
    }
    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };
    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            isAuthenticated
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

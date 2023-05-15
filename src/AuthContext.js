import authApi from "api/authApi";
import {
    removeAxiosAccessToken,
    updateAxiosAccessToken,
} from "api/axiosClient";
import PreferenceKeys from "general/constants/PreferenceKeys";
import ToastHelper from "general/helpers/ToastHelper";
import UserHelper from "general/helpers/UserHelper";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLoggedIn(
            UserHelper.checkToken() && !UserHelper.checkRefreshTokenExpired()
        );
        setUser(UserHelper.getUsername());
        return () => {
        };
    }, []);

    const login = (username, password) => {
        try {
            const fetchData = async () => {
                const response = await authApi.signIn({
                    username: username,
                    password: password,
                });
                updateAxiosAccessToken(response.access_token);
                localStorage.setItem(
                    PreferenceKeys.accessToken,
                    response.access_token
                );
                localStorage.setItem(
                    PreferenceKeys.refreshToken,
                    response.refresh_token
                );
                setLoggedIn(true);
            };
            fetchData();
        } catch (error) {
            ToastHelper.showError("Tài khoản hoặc mật khẩu không chính xác");
        }
    };

    const logout = () => {
        UserHelper.signOut();
        setLoggedIn(false);
        removeAxiosAccessToken();
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };


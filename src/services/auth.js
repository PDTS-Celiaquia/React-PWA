import jwt_decode from "jwt-decode";
import axiosInstance from "./axiosInstance";

// TODO: implement a secure way to store jwt (no jwt ot cookies. maybe httpOnly cookies)
export const getToken = () => {
    const user = getUser();
    return !user ? undefined : user.accessToken;
};

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const deleteUser = () => {
    localStorage.removeItem("user");
};

export async function loginService(data) {
    return axiosInstance
        .post("/api/usuario/login", data)
        .then(({ data: { accessToken } }) => {
            const decoded = jwt_decode(accessToken);
            const user = {
                email: decoded.email,
                role: decoded.role,
                accessToken: accessToken
            }
            setUser(user);
            return user;
        })
};

export async function registerService(data) {
    return axiosInstance
        .post("/api/usuario/register", data)
        .then(({ data: { accessToken } }) => {
            const decoded = jwt_decode(accessToken);
            const user = {
                email: decoded.email,
                role: decoded.role,
                accessToken: accessToken
            }
            setUser(user);
            return user;
        })
};
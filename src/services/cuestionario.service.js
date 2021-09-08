import axiosInstance from "./axiosInstance";

export async function sendCuestionario(data) {
    return axiosInstance.post("/api/cuestionario/nuevo", data)
};
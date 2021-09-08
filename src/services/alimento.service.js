import axiosInstance from "./axiosInstance";

export async function getAllAlimentos() {
    return axiosInstance.get('/api/alimento');
}


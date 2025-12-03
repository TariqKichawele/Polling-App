import axiosInstance from "../../environment/axiosInstance";

export const signup = async (signupRequest) => {
    const response = await axiosInstance.post('/api/auth/signup', signupRequest);
    return response;
}

export const login = async (loginRequest) => {
    const response = await axiosInstance.post('/api/auth/login', loginRequest);
    return response;
}
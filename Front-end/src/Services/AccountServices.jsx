import { api } from "./api"

export const authenticateUser = async (user) => {
    return await api.post("/Controller/AuthenticateUser", user)
        .catch(e => {
            console.log(e);
            return e;
        });
}

export const registerUser = async (user) => {
    return await api.post("Controller/RegisterUser", user)
        .then(response => response.data.status)
        .catch(e => {
            console.log(e);
            return e.status;
        });
}
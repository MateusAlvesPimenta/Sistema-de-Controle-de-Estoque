import { api } from "./api"

export const authenticateUser = async (user) => {
    return await api.post("Account/AuthenticateUser", user)
        .catch(e => {
            console.log(e);
            return e;
        });
}

export const registerUser = async (user) => {
    return await api.post("Account/RegisterUser", user)
        .then(response => response.status)
        .catch(e => {
            console.log(e);
            return e.status;
        });
}
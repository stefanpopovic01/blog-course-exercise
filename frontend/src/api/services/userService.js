import api from "../axios";

export const getUsers = (filters) => {
    return api.get("/users", { params: filters });
};

export const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
}
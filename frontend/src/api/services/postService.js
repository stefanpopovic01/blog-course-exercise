import api from "../axios";

export const getPosts = (search, page) => {
    return api.get("/posts", { params: { search, page } });
}
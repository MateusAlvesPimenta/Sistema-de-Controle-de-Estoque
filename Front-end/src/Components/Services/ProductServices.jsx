import { api } from "./api"

export const getAllProducts = async () => {
    return await api.get("/GetAllProducts")
        .catch(e => console.log(e));
}

export const addProduct = async (entity) => {
    await api.post("/AddProduct", entity)
        .catch(e => console.log(e));
}

export const updateProduct = async (entity) => {
    await api.put("/UpdateProduct/" + entity.productId, entity)
        .catch(e => console.log(e));
}

export const deleteProduct = async (entityId) => {
    await api.delete("/DeleteProduct/" + entityId)
        .catch(e => console.log(e));
}
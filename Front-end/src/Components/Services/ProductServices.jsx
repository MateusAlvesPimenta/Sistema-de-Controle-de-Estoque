import { api } from "./api"

export const getAllProducts = async (config) => {
    return await api.get("/GetAllProducts", config)
        .catch(e => console.log(e));
}

export const getProductsByNameOrSupplier = async (data, config) => {
    return await api.get("/GetProducts/NameOrSupplier", {
        params: {
            name: data.name,
            supplierIds: data.supplierIds
        }
    }, config)
        .catch(e => {
            console.log(e)
            if (e.response.data === "No products found with this filter") {
                return e.status;
            }
        });
}

export const getProductsWithLowStock = async (config) => {
    return await api.get("/GetProductsWithLowStock", config)
        .catch(e => console.log(e));
}

export const addProduct = async (entity, config) => {
    await api.post("/AddProduct", entity, config)
        .catch(e => console.log(e));
}

export const updateProduct = async (entity, config) => {
    await api.put("/UpdateProduct/" + entity.productId, entity, config)
        .catch(e => console.log(e));
}

export const restockProduct = async (entityId, quantity, config) => {
    await api.put(`/RestockProduct/${entityId}?quantity=${quantity}`, quantity, config)
        .catch(e => console.log(e));
}

export const deleteProduct = async (entityId, config) => {
    await api.delete("/DeleteProduct/" + entityId, config)
        .catch(e => console.log(e));
}
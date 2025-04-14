import { api } from "./api";

export const getAllSuppliers = async (config) => {
    return await api.get("/GetAllSuppliers", config)
        .catch(e => console.log(e));
}

export const addSupplier = async (entity, config) => {
    await api.post("/AddSupplier", entity, config)
        .catch(e => console.log(e));
}

export const updateSupplier = async (entity, config) => {
    await api.put("/UpdateSupplier/" + entity.supplierId, entity, config)
        .catch(e => console.log(e));
}

export const deleteSupplier = async (entityId, config) => {
    await api.delete("/DeleteSupplier/" + entityId, config)
        .catch(e => console.log(e));
}
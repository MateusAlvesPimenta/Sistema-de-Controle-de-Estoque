import { api } from "./api";

export const getAllSuppliers = async () => {

    return await api.get("/GetAllSuppliers")
        .catch(e => console.log(e));
}

export const addSupplier = async (entity) => {
    await api.post("/AddSupplier", entity)
        .catch(e => console.log(e));
}

export const updateSupplier = async (entity) => {
    await api.put("/UpdateSupplier/" + entity.supplierId, entity)
        .catch(e => console.log(e));
}

export const deleteSupplier = async (entityId) => {
    await api.delete("/DeleteSupplier/" + entityId)
        .catch(e => console.log(e));
}
import { api } from "./api";

export const getAllSuppliers = async (config) => {
    return await api.get("Supplier/GetAllSuppliers", config)
        .catch(e => console.log(e));
}

export const addSupplier = async (entity, config) => {
    await api.post("Supplier/AddSupplier", entity, config)
        .catch(e => console.log(e));
}

export const updateSupplier = async (entity, config) => {
    await api.put("Supplier/UpdateSupplier/" + entity.supplierId, entity, config)
        .catch(e => console.log(e));
}

export const deleteSupplier = async (entityId, config) => {
    await api.delete("Supplier/DeleteSupplier/" + entityId, config)
        .catch(e => console.log(e));
}
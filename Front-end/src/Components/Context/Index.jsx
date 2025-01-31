import React, { useState, createContext, useMemo } from "react";
import { addSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from "../Services/SupplierService";

export const Context = createContext({});

export const ContextProvider = (props) => {

    const [updateData, setUpdateData] = useState(true);
    const [suppliers, setSuppliers] = useState([]);


    const getAll = async (entityType) => {
        if (entityType === "supplier") {
            let tempSuppliers = await getAllSuppliers();
            setSuppliers(tempSuppliers.data);
        }
    }

    const post = async (entity, entityType) => {
        if (entityType === "supplier") { 
            await addSupplier(entity);
            setUpdateData(true);
        }
    }

    const put = async (entity, entityType) => {
        if (entityType === "supplier") {
            await updateSupplier(entity);
            setUpdateData(true);
        }
    }

    const deleteEntity = async (entityId, entityType) => {
        if (entityType === "supplier") {
            await deleteSupplier(entityId);
            setUpdateData(true);
        }
    }

    useMemo(() => {
        getAll("supplier");
        setUpdateData(false);
    }, [updateData])

    return (
        <Context.Provider
            value={{
                suppliers,
                post,
                put,
                deleteEntity
            }}>
            {props.children}
        </Context.Provider>
    )
}
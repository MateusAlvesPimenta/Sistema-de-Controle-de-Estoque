import React, { useState, createContext, useMemo } from "react";
import { getAllSuppliers, updateSupplier } from "../Services/SupplierService";

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

    const put = async (entity, entityType) => {
        if (entityType === "supplier") {
            await updateSupplier(entity);
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
                put
            }}>
            {props.children}
        </Context.Provider>
    )
}
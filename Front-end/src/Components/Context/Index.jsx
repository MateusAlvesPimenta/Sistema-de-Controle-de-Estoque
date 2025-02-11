import { useState, createContext, useMemo } from "react";
import { addSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from "../Services/SupplierService";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../Services/ProductServices";

export const Context = createContext({});

export const ContextProvider = (props) => {

    const [updateData, setUpdateData] = useState(true);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);


    const getAll = async (entityType) => {
        if (entityType === "supplier") {
            let tempSuppliers = await getAllSuppliers();
            setSuppliers(tempSuppliers.data);
            return;
        }
        let tempProducts = await getAllProducts();
        setProducts(tempProducts.data);
    }

    const post = async (entity, entityType) => {
        if (entityType === "supplier") { 
            await addSupplier(entity);
            setUpdateData(true);
            return;
        }
        await addProduct(entity);
        setUpdateData(true);
    }

    const put = async (entity, entityType) => {
        if (entityType === "supplier") {
            await updateSupplier(entity);
            setUpdateData(true);
            return;
        }
        await updateProduct(entity);
        setUpdateData(true);
    }

    const deleteEntity = async (entityId, entityType) => {
        if (entityType === "supplier") {
            await deleteSupplier(entityId);
            setUpdateData(true);
            return;
        }
        await deleteProduct(entityId);
        setUpdateData(true);
    }

    useMemo(() => {
        getAll("supplier");
        getAll("product");
        setUpdateData(false);
    }, [updateData])

    return (
        <Context.Provider
            value={{
                suppliers,
                products,
                post,
                put,
                deleteEntity
            }}>
            {props.children}
        </Context.Provider>
    )
}
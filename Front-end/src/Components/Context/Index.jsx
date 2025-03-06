import { useState, createContext, useMemo } from "react";
import { addSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from "../Services/SupplierService";
import { addProduct, deleteProduct, getAllProducts, getProductsByNameOrSupplier, updateProduct } from "../Services/ProductServices";
import { addSale, getAllSales, getSalesByDate } from "../Services/SalesService";
import { addExpense, deleteExpense, getAllExpenses, updateExpense } from "../Services/ExpenseService";

export const Context = createContext({});

export const ContextProvider = (props) => {

    const [updateData, setUpdateData] = useState(true);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);


    const getAll = async (entityType) => {
        if (entityType === "supplier") {
            let tempSuppliers = await getAllSuppliers();
            setSuppliers(tempSuppliers.data);
            return;
        }
        else if (entityType === "product") {
            let tempProducts = await getAllProducts();
            setProducts(tempProducts.data);
            return;
        }
        else if (entityType === "expense") {
            let tempExpenses = await getAllExpenses();
            setExpenses(tempExpenses.data);
            setTotalExpenses(tempExpenses.data.reduce((accumulator, next) => accumulator + next.price, 0));
            return;
        }
        let tempSales = await getAllSales();
        setSales(tempSales.data);
        setTotalSales(tempSales.data.reduce((accumulator, next) => accumulator + next.total, 0));
    }

    const getByNameOrSupplier = async (data) => {
        let tempProducts = await getProductsByNameOrSupplier(data);

        if (tempProducts.status === 200) {
            setProducts(tempProducts.data);
            return;
        }
        setProducts([]);
    }

    const getByDate = async (date1, date2) => {
        let tempSales = await getSalesByDate(date1, date2);

        if (tempSales.status == 200) {
            setSales(tempSales.data);
            return;
        }
        setSales([]);
    }

    const post = async (entity, entityType) => {
        if (entityType === "supplier") {
            await addSupplier(entity);
            setUpdateData(true);
            return;
        }
        else if (entityType === "expense") {
            await addExpense(entity);
            setUpdateData(true);
            return;
        }
        await addProduct(entity);
        setUpdateData(true);
    }

    const postSale = async (name, saleItems) => {
        await addSale(name, saleItems);
        setUpdateData(true);
    }

    const put = async (entity, entityType) => {
        if (entityType === "supplier") {
            await updateSupplier(entity);
            setUpdateData(true);
            return;
        }
        else if (entityType === "expense") {
            await updateExpense(entity);
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
        else if (entityType === "expense") {
            await deleteExpense(entityId);
            setUpdateData(true);
            return;
        }
        await deleteProduct(entityId);
        setUpdateData(true);
    }

    useMemo(() => {
        getAll("supplier");
        getAll("product");
        getAll("sale");
        getAll("expense");
        setUpdateData(false);
    }, [updateData])

    return (
        <Context.Provider
            value={{
                suppliers,
                products,
                sales,
                expenses,
                totalExpenses,
                totalSales,
                post,
                postSale,
                put,
                deleteEntity,
                getByNameOrSupplier,
                getByDate
            }}>
            {props.children}
        </Context.Provider>
    )
}
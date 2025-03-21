import { useState, createContext, useMemo } from "react";
import { addSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from "../Services/SupplierService";
import { addProduct, deleteProduct, getAllProducts, getProductsByNameOrSupplier, getProductsWithLowStock, restockProduct, updateProduct } from "../Services/ProductServices";
import { addSale, getAllSaleItems, getAllSales, getSalesByDate } from "../Services/SalesService";
import { addExpense, deleteExpense, getAllExpenses, getExpensesByDate, updateExpense } from "../Services/ExpenseService";

export const Context = createContext({});

export const ContextProvider = (props) => {

    const [updateData, setUpdateData] = useState(true);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsWithLowStock, setProductsWithLowStock] = useState([]);
    const [sales, setSales] = useState([]);
    const [saleItems, setSaleItems] = useState([]);
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
        else if (entityType === "saleItem") {
            let tempSaleItems = await getAllSaleItems();
            setSaleItems(tempSaleItems.data);
            return;
        }
        else if (entityType === "productsWithLowStock") {
            let tempProductsWithLowStock = await getProductsWithLowStock();
            setProductsWithLowStock(tempProductsWithLowStock.data);
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

    const getByDate = async (date1, date2, entityType) => {

        if (entityType === "sale") {
            let tempSales = await getSalesByDate(date1, date2);

            if (tempSales.status === 200) {
                setSales(tempSales.data);
                setTotalSales(tempSales.data.reduce((accumulator, next) => accumulator + next.total, 0));
                return;
            }
            setTotalSales(0);
            setSales([]);
            return;
        }
        let tempExpenses = await getExpensesByDate(date1, date2);

        if (tempExpenses.status === 200) {
            setExpenses(tempExpenses.data);
            setTotalExpenses(tempExpenses.data.reduce((accumulator, next) => accumulator + next.price, 0));
            return;
        }
        setTotalExpenses(0);
        setExpenses([]);
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

    const restock = async (entityId, quantity) => {
        await restockProduct(entityId, quantity);
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
        getAll("saleItem");
        getAll("productsWithLowStock");
        setUpdateData(false);
    }, [updateData])

    return (
        <Context.Provider
            value={{
                suppliers,
                products,
                productsWithLowStock,
                sales,
                saleItems,
                expenses,
                totalExpenses,
                totalSales,
                post,
                postSale,
                put,
                restock,
                deleteEntity,
                getAll,
                getByNameOrSupplier,
                getByDate
            }}>
            {props.children}
        </Context.Provider>
    )
}
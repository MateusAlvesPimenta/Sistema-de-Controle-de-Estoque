import { useState, createContext, useMemo } from "react";
import { addSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from "../Services/SupplierServices";
import {
    addProduct, deleteProduct, getAllProducts,
    getProductsByNameOrSupplier, getProductsWithLowStock,
    restockProduct, updateProduct
} from "../Services/ProductServices";
import { addSale, getAllSaleItems, getAllSales, getSalesByDate } from "../Services/SalesServices";
import { addExpense, deleteExpense, getAllExpenses, getExpensesByDate, updateExpense } from "../Services/ExpenseServices";
import { authenticateUser, registerUser } from "../Services/AccountServices";

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
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");

    const getAll = async (entityType) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const handlers = {
            supplier: async () => {
                const tempSuppliers = await getAllSuppliers(config);
                setSuppliers(tempSuppliers.data);
            },
            product: async () => {
                const tempProducts = await getAllProducts(config);
                setProducts(tempProducts.data);
            },
            expense: async () => {
                const tempExpenses = await getAllExpenses(config);
                setExpenses(tempExpenses.data);
                setTotalExpenses(tempExpenses.data.reduce((accumulator, next) => accumulator + next.price, 0));
            },
            sale: async () => {
                const tempSales = await getAllSales(config);
                setSales(tempSales.data);
                setTotalSales(tempSales.data.reduce((accumulator, next) => accumulator + next.total, 0));
            },
            saleItem: async () => {
                const tempSaleItems = await getAllSaleItems(config);
                setSaleItems(tempSaleItems.data);
            },
            productsWithLowStock: async () => {
                const tempProductsWithLowStock = await getProductsWithLowStock(config);
                setProductsWithLowStock(tempProductsWithLowStock.data);
            },
            default: () => console.warn(`Invalid getAll request \nEntity type: ${entityType}`)
        };
        await (handlers[entityType] || handlers.default)();
    }

    const getByNameOrSupplier = async (data) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const tempProducts = await getProductsByNameOrSupplier(data, config);

        if (tempProducts.status === 200) {
            setProducts(tempProducts.data);
            return;
        }
        setProducts([]);
    }

    const getByDate = async (date1, date2, entityType) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        switch (entityType) {
            case "sale": {
                const tempSales = await getSalesByDate(date1, date2, config);

                if (tempSales.status === 200) {
                    setSales(tempSales.data);
                    setTotalSales(tempSales.data.reduce((accumulator, next) => accumulator + next.total, 0));
                    break;
                }
                setTotalSales(0);
                setSales([]);
                break;
            }

            case "expense": {
                const tempExpenses = await getExpensesByDate(date1, date2, config);

                if (tempExpenses.status === 200) {
                    setExpenses(tempExpenses.data);
                    setTotalExpenses(tempExpenses.data.reduce((accumulator, next) => accumulator + next.price, 0));
                    break;
                }
                setTotalExpenses(0);
                setExpenses([]);
                break;
            }

            default:
                console.warn(`Invalid getByDate request \nEntity type: ${entityType} \nDates: ${[date1, date2]}`);
                break;
        }
    }

    const post = async (entity, entityType) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const handlers = {
            supplier: addSupplier,
            product: addProduct,
            expense: addExpense,
            sale: addSale
        };
        const handler = handlers[entityType];
        if (!handler) {
            console.warn(`Invalid post request \nEntity type: ${entityType} \nEntity: `, entity);
            return;
        }
        await handler(entity, config);
        setUpdateData(true);
    }

    const put = async (entity, entityType) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const handlers = {
            product: updateProduct,
            supplier: updateSupplier,
            expense: updateExpense
        };
        const handler = handlers[entityType];

        if (!handler) {
            console.warn(`Invalid put request \nEntity type: ${entityType} \nEntity`, entity);
            return;
        }
        await handler(entity, config);
        setUpdateData(true);
    }

    const restock = async (entityId, quantity) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await restockProduct(entityId, quantity, config);
        setUpdateData(true);
    }

    const deleteEntity = async (entityId, entityType) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const handlers = {
            product: deleteProduct,
            supplier: deleteSupplier,
            expense: deleteExpense
        };
        const handler = handlers[entityType];
        if (!handler) {
            console.warn(`Invalid delete request \nEntity type: ${entityType}`);
            return;
        }
        await handler(entityId, config);
        setUpdateData(true);
    }

    const authenticate = async (user, authenticationType) => {
        switch (authenticationType) {
            case "login": {
                const response = await authenticateUser(user);
                if (response.status === 200) {
                    setToken(response.data.token);
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("expiration", response.data.expiration.toLocaleString());
                }
                setUpdateData(true);
                return response.status;
            }

            case "register":
                return await registerUser(user);

            default:
                console.warn(`Invalid authentication type ${authenticationType}`);
                break;
        }
    }

    const logout = () => {
        sessionStorage.clear();
        setToken("");
        setProducts([]);
        setProductsWithLowStock([]);
        setSuppliers([]);
        setSales([]);
        setSaleItems([]);
        setExpenses([]);
        setTotalExpenses(0);
        setTotalSales(0);
    }

    useMemo(() => {
        if (token) {
            getAll("supplier");
            getAll("product");
            getAll("sale");
            getAll("expense");
            getAll("saleItem");
            getAll("productsWithLowStock");
        }
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
                getAll,
                getByNameOrSupplier,
                getByDate,
                post,
                put,
                restock,
                deleteEntity,
                authenticate,
                logout
            }}>
            {props.children}
        </Context.Provider>
    )
}
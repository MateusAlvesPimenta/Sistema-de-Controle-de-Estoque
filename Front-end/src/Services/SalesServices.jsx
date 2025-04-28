import { api } from "./api"

export const getAllSales = async (config) => {
    return await api.get("Sale/GetAllSales", config)
        .catch(e => console.log(e));
}

export const getSaleById = async (saleId, config) => {
    return await api.get("Sale/GetSale/" + saleId, config)
        .catch(e => console.log(e));
}

export const getAllSaleItems = async (config) => {
    return await api.get("Sale/GetAllSaleItems", config)
        .catch(e => console.log(e));
}

export const getSalesByDate = async (date1, date2, config) => {
    return await api.get(`Sale/GetSalesByDate?initialDate=${date1}&lastDate=${date2}`, config)
        .catch(e => {
            console.log(e)
            if (e.status === 404) {
                return { status: 404 };
            }
        });
}

export const addSale = async (saleDTO, config) => {
    await api.post("Sale/AddSale", saleDTO, config)
        .catch(e => console.log(e));
}

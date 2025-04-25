import { api } from "./api"

export const getAllSales = async (config) => {
    return await api.get("/GetAllSales", config)
        .catch(e => console.log(e));
}

export const getSaleById = async (saleId, config) => {
    return await api.get("/GetSale/" + saleId, config)
        .catch(e => console.log(e));
}

export const getAllSaleItems = async (config) => {
    return await api.get("/GetAllSaleItems", config)
        .catch(e => console.log(e));
}

export const getSalesByDate = async (date1, date2, config) => {
    return await api.get(`/GetSalesByDate?initialDate=${date1}&lastDate=${date2}`, config)
        .catch(e => {
            console.log(e)
            if (e.status === 404) {
                return { status: 404 };
            }
        });
}

export const addSale = async (saleDTO, config) => {
    await api.post("/AddSale", saleDTO, config)
        .catch(e => console.log(e));
}

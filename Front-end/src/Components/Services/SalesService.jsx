import { api } from "./api"

export const getAllSales = async () => {
    return await api.get("/GetAllSales")
        .catch(e => console.log(e));
}

export const getSalesByDate = async (date1, date2) => {
    return await api.get(`/GetSalesByDate?initialDate=${date1}&lastDate=${date2}`)
        .catch(e => {
            console.log(e)
            if (e.status === 404) {
                return { status: 404 };
            }
        });
}

export const addSale = async (name, saleItems) => {
    let saleDTO = {
        customerName: name,
        saleItemDTOs: saleItems
    }
    await api.post("/AddSale", saleDTO).catch(e => console.log(e));
}

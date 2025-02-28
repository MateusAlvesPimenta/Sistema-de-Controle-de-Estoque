import { api } from "./api"

export const getAllSales = async () => {
    return await api.get("/GetAllSales")
        .catch(e => console.log(e));
}

export const getSalesByDate = async (date1, date2) => {
    return await api.get("/GetSalesByDate", {
        params: {
            initialDate: date1,
            lastDate: date2
        }
    }).catch(e => console.log(e));
}

export const addSale = async (name, saleItems) => {
    let saleDTO = {
        customerName: name,
        saleItemDTOs: saleItems
    }
    console.log(saleDTO);
    await api.post("/AddSale", saleDTO).catch(e => console.log(e));
}

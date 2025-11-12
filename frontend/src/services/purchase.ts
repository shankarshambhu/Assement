import commonAPI from "./commonAPI"
const baseURL = import.meta.env.VITE_BASE_URL;




export const purchaseProduct = async (id: number, quantity: number) => {
    return await commonAPI('POST', `${baseURL}/purchase/createpurchase/${id}`, { quantity })
}

export const getAllPurchases = async () => {
    return await commonAPI('GET', `${baseURL}/purchase/allpurchases`)

}




import commonAPI from "./commonAPI"
const baseURL = import.meta.env.VITE_BASE_URL;


export const getAllProducts = async () => {
    return await commonAPI('GET', `${baseURL}/product/allproduct`)
}

export const addProduct = async (name: string, price: number, currentStock: number, taxPercentage: number) => {
    return await commonAPI('POST', `${baseURL}/product/createproduct`, { name, price, currentStock, taxPercentage })
}

export const deleteProduct = async (id: string) => {
    return await commonAPI('DELETE', `${baseURL}/product/deleteproduct/${id}`)

}

export const updateProduct = async (id: string, name: string, price: number, currentStock: number, taxPercentage: number) => {
    return await commonAPI('PUT', `${baseURL}/product/updateproduct/${id}`, { name, price, currentStock, taxPercentage })

}


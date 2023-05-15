import {$authHost} from "./index";

export const createMyOrder = async (cartId, paymentStatusId, orderPrice) => {
    const {data} = await $authHost.post(`api/order`, {cartId, paymentStatusId, orderPrice})
    return data
}
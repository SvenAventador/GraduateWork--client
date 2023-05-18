import {$authHost} from "./index";

export const createMyOrder = async (cartId, paymentStatusId, orderPrice) => {
    const {data} = await $authHost.post(`api/order`, {cartId, paymentStatusId, orderPrice})
    return data
}

/**
 * Получение всех заказов.
 * @param id - идентификатор пользователя.
 * @return {Promise<any>}
 */
export const getAllOrder = async (id) => {
    const {data} = await $authHost.get(`api/order/${id}`)
    return data
}

export const getOneOrder = async (id, deliveryStatusId) => {
    const {data} = await $authHost.post('api/order/order-update', {id, deliveryStatusId})
    return data
}
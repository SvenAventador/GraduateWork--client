import {$authHost} from "./index";

/**
 * Добавление товара в корзину.
 * @param deviceId - Идентификатор устройства.
 * @param cartId = Идентификатор корзины.
 * @returns {Promise<any>}
 */
export const createCartItem = async (cartId, deviceId) => {
    try {
        const {data} = await $authHost.post('/api/cart/', {cartId, deviceId})
        return data
    } catch (e) {
        return e.response.data
    }
}

/**
 * Получение всех товаров в корзине.
 * @param cartId - Идентификатор корзины.
 * @returns {Promise<any>}
 */
export const getAllCartItem = async (cartId) => {
    try {
        const {data} = await $authHost.get('/api/cart/get-all-goods/' + cartId)
        return data
    } catch (e) {
        return e.response.data
    }
}

/**
 * Удаление товара из корзины.
 * @param deviceId - Идентификатор - корзины.
 * @param cartId - Идентификатор корзины.
 * @returns {Promise<any>}
 */
export const removeCartItem = async (cartId, deviceId) => {
    try {
        const {data} = await $authHost.delete('/api/cart/' + cartId + '/' + deviceId)
        return data
    } catch (e) {
        return e.response.data
    }
}

/**
 * Очистка коризны а-ля оформление покупки.
 * @param cartId - Идентификатор корзины.
 * @returns {Promise<void>}
 */
export const removeAllItems = async (cartId) => {
    try {
        const {data} = await $authHost.delete('/api/cart/' + cartId)
    } catch (e) {
        return e.response.message
    }
}

/**
 * Получение корзины.
 * @param id - Идентификатор.
 * @returns {Promise<any>}
 */
export const getCartId = async (id) => {
    try {
        const {data} = await $authHost.get('/api/cart/' + id)
        return data
    } catch (e) {
        return e.response.message
    }
}
import {$authHost} from "./index";

/**
 * Создание оценки товара.
 * @param userId - Идентификатор пользователя.
 * @param deviceId - Идентификатор устройства.
 * @param rate - Рейтинг товара.
 * @return {Promise<any>}
 */
export const createMark = async (userId, deviceId, rate) => {
    try {
        const {data} = await $authHost.post('/api/rating', {userId, deviceId, rate})
        return data
    } catch (e) {
        return e.response.data
    }
}
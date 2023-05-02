import {$host} from "./index";

/**
 * Получение всех типов.
 * @returns {Promise<any>}
 */
export const getAllTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

/**
 * Получение всех брендов.
 * @returns {Promise<any>}
 */
export const getAllBrand = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

/**
 * Получение одного бренда.
 * @param id - Идентификатор бренда.
 * @returns {Promise<any>}
 */
export const getOneBrand = async (id) => {
    const {data} = await $host.get('api/brand/' + id)
    return data
}

/**
 * Получение всех устройств.
 * @param brandId - Идентификтор бренда.
 * @param typeId - Идентификтаор типа.
 * @param page - Текущая страница.
 * @param limit - Количество устройств на странице.
 * @returns {Promise<any>}
 */
export const getAllDevices = async (brandId, typeId, page, limit = 5) => {
    const {data} = await $host.get('api/device', {
        params: {
            brandId, typeId, page, limit
        }
    })
    return data
}

/**
 * Получение одного устройства.
 * @param id - Идентификатор устройства.
 * @returns {Promise<void>}
 */
export const getOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

/**
 * Оценка товара.
 * @param deviceId - Идентификатор устройства.
 * @returns {Promise<void>}
 */
export const putMark = async (deviceId) => {
    const {data} = await $host.put('api/device/' + deviceId)
    return data
}
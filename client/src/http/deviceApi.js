import {$host} from "./index";

//region Типы товаров
/**
 * Получение всех типов.
 * @returns {Promise<any>}
 */
export const getAllTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
//endregion

//region Все, что относится к сортировке
/**
 * Получение всех брендов.
 * @returns {Promise<any>}
 */
export const getAllBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

/**
 * Получение всех цветов.
 * @return {Promise<any>}
 */
export const getAllColors = async () => {
    const {data} = await $host.get('api/color')
    return data
}

/**
 * Получение всех материалов корпусов.
 * @return {Promise<any>}
 */
export const getAllMaterials = async () => {
    const {data} = await $host.get('api/material')
    return data
}

/**
 * Получение всех беспроводных устройств
 * @return {Promise<any>}
 */
export const getAllWireless = async () => {
    const {data} = await $host.get('api/wireless')
    return data
}
//endregion

//region Получение товара(-ов)
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
 * @param colorId
 * @param deviceMaterialId
 * @param wirelessTypeId
 * @param page - Текущая страница.
 * @param limit - Количество устройств на странице.
 * @param priceFrom
 * @param priceTo
 * @param rating
 * @returns {Promise<any>}
 */
export const getAllDevices = async (typeId,
                                    brandId,
                                    colorId,
                                    deviceMaterialId,
                                    wirelessTypeId,
                                    limit,
                                    page,
                                    priceFrom,
                                    priceTo,
                                    rating) => {
    const {data} = await $host.get('api/device', {
        params: {
            typeId,
            brandId,
            colorId,
            deviceMaterialId,
            wirelessTypeId,
            limit,
            page,
            priceFrom,
            priceTo,
            rating
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
//endregion

//region Оценка товара
/**
 * Оценка товара.
 * @param deviceId - Идентификатор устройства.
 * @returns {Promise<void>}
 */
export const putMark = async (deviceId) => {
    const {data} = await $host.put('api/device/' + deviceId)
    return data
}
//endregion
import {$authHost} from "./index";

//region Работа с заказами пользователей.
export const getAllUserOrder = async () => {
    const {data} = await $authHost.get('api/order/user-order')
    return data
}
//endregion

//region Работа с составными устройств.

    //region Типы устройств
    export const createType = async (typeName) => {
        const {data} = await $authHost.post('api/type', {typeName})
        return data
    }

    export const updateType = async (id, typeName) => {
        const {data} = await $authHost.put('api/type', {id, typeName})
        return data
    }

    export const deleteType = async (id) => {
        const {data} = await $authHost.delete('/api/type', {data: {id}})
        return data
    }
    //endregion

    //region Бренды устройств
    export const createBrand = async (brandName) => {
        const {data} = await $authHost.post('api/brand', {brandName})
        return data
    }

    export const updateBrand = async (id, brandName) => {
        const {data} = await $authHost.put('api/brand', {id, brandName})
        return data
    }

    export const deleteBrand = async (id) => {
        const {data} = await $authHost.delete('/api/brand', {data: {id}})
        return data
    }
    //endregion

    //region Материалы устройств
    export const createMaterial = async (materialName) => {
        const {data} = await $authHost.post('api/material', {materialName})
        return data
    }

    export const updateMaterial = async (id, materialName) => {
        const {data} = await $authHost.put('api/material', {id, materialName})
        return data
    }

    export const deleteMaterial = async (id) => {
        const {data} = await $authHost.delete('/api/material', {data: {id}})
        return data
    }
    //endregion

    //region Дополнения устройств
    export const createWireless = async (typeName) => {
        const {data} = await $authHost.post('api/wireless', {typeName})
        return data
    }

    export const updateWireless = async (id, typeName) => {
        const {data} = await $authHost.put('api/wireless', {id, typeName})
        return data
    }

    export const deleteWireless = async (id) => {
        const {data} = await $authHost.delete('/api/wireless', {data: {id}})
        return data
    }
    //endregion

    //region Цвета устройств
    export const createColor = async (colorName, hexValue) => {
        const {data} = await $authHost.post('api/color', {colorName, hexValue})
        return data
    }

    export const updateColor= async (id, colorName, hexValue) => {
        const {data} = await $authHost.put('api/color', {id, colorName, hexValue})
        return data
    }

    export const deleteColor = async (id) => {
        const {data} = await $authHost.delete('/api/color', {data: {id}})
        return data
    }
    //endregion

//endregion

//region Работа с устройствами.

//endregion

//region Простая аналитика.
//endregion
import {makeAutoObservable} from "mobx" // слежка за изменениями переменных, которые будут переданы в параметр функции

/**
 * Данные девайсов.
 */
export default class DeviceStore {

    constructor() {

        this._types = []
        this._brands = []
        this._devices = []

        this._selectedType = {}
        this._selectedBrand = {}

        this._page = 1
        this._totalCount = 0
        this._limit = 4
        makeAutoObservable(this)

    }

    setType(type) {
        this._types = type
    }
    setBrand(brand) {
        this._brands = brand
    }
    setDevice(device) {
        this._devices = device
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    setSelectedTypes(types) {
        this.setPage(1)
        this._selectedType = types
    }
    setSelectedBrands(brands) {
        this.setPage(1)
        this._selectedBrand = brands
    }


    get type() {
        return this._types
    }
    get brand() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

    get selectedTypes() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}
import {makeAutoObservable} from "mobx" // слежка за изменениями переменных, которые будут переданы в параметр функции

/**
 * Данные девайсов.
 */
export default class DeviceStore {

    constructor() {

        this._types = []
        this._brands = []
        this._colors = []
        this._materials = []
        this._wireless = []
        this._rating = [
            {
                id: 1,
                value: 1
            },
            {
                id: 2,
                value: 2
            },
            {
                id: 3,
                value: 3
            },
            {
                id: 4,
                value: 4
            },
            {
                id: 5,
                value: 5
            }
        ]
        this._minPrice = null
        this._maxPrice = null
        this._devices = []

        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedColors = {}
        this._selectedMaterials = {}
        this._selectedWireless = {}
        this._selectedRating = {}

        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)

    }

    setType(type) {
        this._types = type
    }

    setBrand(brand) {
        this._brands = brand
    }

    setColor(color) {
        this._colors = color
    }

    setMaterial(material) {
        this._materials = material
    }

    setWireless(wireless) {
        this._wireless = wireless
    }

    setRating(rating) {
        this._rating = rating
    }

    setMinPrice(minPrice) {
        console.log('minPrice ', minPrice)
        this._minPrice = minPrice
    }

    setMaxPrice(maxPrice) {
        this._maxPrice = maxPrice
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

    setSelectedColors(colors) {
        this.setPage(1)
        this._selectedColors = colors
    }

    setSelectedMaterials(material) {
        this.setPage(1)
        this._selectedMaterials = material
    }

    setSelectedWireless(wireless) {
        this.setPage(1)
        this._selectedWireless = wireless
    }

    setSelectedRating(rating) {
        this.setPage(1)
        this._selectedRating = rating
    }

    get type() {
        return this._types
    }

    get brand() {
        return this._brands
    }

    get color() {
        return this._colors
    }

    get material() {
        return this._materials
    }

    get wireless() {
        return this._wireless
    }

    get rating() {
        return this._rating
    }

    get minPrice() {
        return this._minPrice
    }

    get maxPrice() {
        return this._maxPrice
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

    get selectedColors() {
        return this._selectedColors
    }

    get selectedMaterials() {
        return this._selectedMaterials
    }

    get selectedWireless() {
        return this._selectedWireless
    }

    get selectedRating() {
        return this._selectedRating
    }
}
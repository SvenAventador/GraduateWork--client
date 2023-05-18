import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._order = []

        makeAutoObservable(this)
    }

    setOrder(order) {
        this._order = order
    }

    get order() {
        return this._order
    }
}
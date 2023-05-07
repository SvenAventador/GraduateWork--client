import {makeAutoObservable} from "mobx";

export default class CartStore {
    constructor() {
        this._cartId = null

        makeAutoObservable(this)
    }

    setCartId(cartId) {
        this._cartId = cartId
    }

    get cartId() {
        return this._cartId
    }
}
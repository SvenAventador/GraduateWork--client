import React from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {NavLink, useNavigate} from "react-router-dom";
import {getAllCartItem, getCartId, removeAllItems, removeCartItem} from "../../http/cartApi";
import {CART_ROUTE, CURRENT_DEVICE_ROUTE, ORDER_ROUTE} from "../../utils/consts";
import Swal from "sweetalert2";
import queryString from 'query-string';

import {ReactComponent as Minus} from "../../assets/svg/cart/minus.svg";
import {ReactComponent as Plus} from "../../assets/svg/cart/plus.svg";
import {ReactComponent as Delete} from "../../assets/svg/cart/delete.svg";
import {ReactComponent as WhatsApp} from "../../assets/svg/cart/wa.svg";
import {ReactComponent as Telegram} from "../../assets/svg/cart/tg.svg";

const Cart = observer(() => {
    const {cart, user} = React.useContext(Context)
    const [clientOrder, setClientOrder] = React.useState([])
    const [deviceAmount, setDeviceAmount] = React.useState(0)
    const [totalCost, setTotalCost] = React.useState(0)
    const history = useNavigate()

    React.useEffect(() => {
        if (cart.cartId === null) {
            getCartId(user.user.id).then((cartId) => {
                cart.setCartId(cartId)
                console.log(cartId, cart.cartId)
            })
        }
    }, [cart, user.user.id])

    React.useEffect(() => {
        if (cart.cartId !== null) {
            getAllCartItem(cart.cartId).then((data) => {
                setClientOrder(data)
            })
        }
    }, [cart.cartId])

    React.useEffect(() => {
        setDeviceAmount(clientOrder.map(device => device.cart_devices[0].amountDevice))
    }, [clientOrder])

    React.useEffect(() => {
        const calculateTotalCount = () => {
            let sum = 0
            clientOrder.forEach((device, index) => {
                sum += device.devicePrice * deviceAmount[index]
            })
            setTotalCost(sum)
        }
        calculateTotalCount()
    }, [clientOrder, deviceAmount])

    const handleAddGood = (index) => {
        const newDeviceAmount = [...deviceAmount];
        newDeviceAmount[index]++;
        setDeviceAmount(newDeviceAmount);
    }

    const handleDeleteGood = (index) => {
        const newDeviceAmount = [...deviceAmount];
        newDeviceAmount[index]--;
        setDeviceAmount(newDeviceAmount);
    }

    const handleOrderClick = () => {
        const queryStringParams = queryString.stringify({
            clientOrder: JSON.stringify(clientOrder),
            totalCost: totalCost,
        });
        history(`${ORDER_ROUTE}?${queryStringParams}`)
    };


    return (
        <div className="cart-container">
            <div className="cart site-container">
                <div className="cart__title">
                    <div className="cart__title--name">
                        Моя корзина
                    </div>
                    <button className="btn-reset cart__title--name"
                            onClick={() => {
                                return Swal.fire({
                                    icon: 'question',
                                    title: 'Маленькое уточнение!',
                                    text: 'Вы точно хотите удалить товар?',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    cancelButtonText: 'Нет, не хочу!',
                                    confirmButtonText: 'Да, хочу!'
                                }).then((result) => {
                                        if (result.isConfirmed) {
                                            setClientOrder([])
                                            removeAllItems(cart.cartId).then(() => {
                                                return Swal.fire({
                                                    icon: 'success',
                                                    title: 'Ваушки!',
                                                    text: 'Корзина успешно очищена!'
                                                })
                                            })
                                        }
                                    }
                                )
                            }}>
                        <Delete/>
                    </button>
                </div>
                {
                    clientOrder.length !== 0 ? (
                            <>
                                <div className="cart-good">
                                    <div className="cart-form">
                                        {
                                            clientOrder && clientOrder.map((device, index) => {
                                                    return (
                                                        <div className="cart-device"
                                                             key={index}>
                                                            <NavLink to={CURRENT_DEVICE_ROUTE + '/' + device.id}
                                                                     className="cart-device__left">
                                                                <div className="cart_device__left--image">
                                                                    <img
                                                                        src={`${process.env.REACT_APP_API_PATH}/${device.images[0].imagePath}`}
                                                                        alt="Device images"
                                                                        aria-label="Device Image"/>
                                                                </div>
                                                                <div className="cart-device__left--description">
                                                                    <div className="cart-device__left--description-name">
                                                                        {device.deviceName}
                                                                    </div>
                                                                    <div className="cart-device__left--description-price">
                                                                        <span>{device.devicePrice}₽</span>
                                                                        <span>* {deviceAmount[index]}</span>
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                            <div className="cart-device__right">
                                                                <div className="cart-device__amount">
                                                                    <button className={"cart-device__amount--delete btn-reset"}
                                                                            disabled={deviceAmount[index] === 1}
                                                                            onClick={() => handleDeleteGood(index)}>
                                                                        <Minus/>
                                                                    </button>
                                                                    <span
                                                                        className="cart-device__amount">{deviceAmount[index]}</span>
                                                                    <button className="cart-device__amount--add-active btn-reset"
                                                                            disabled={deviceAmount[index] === 30}
                                                                            onClick={() => handleAddGood(index)}>
                                                                        <Plus/>
                                                                    </button>
                                                                </div>
                                                                <div className="cart-device__delete">
                                                                    <button className="btn-reset"
                                                                            onClick={() => {
                                                                                return Swal.fire({
                                                                                    icon: 'question',
                                                                                    title: 'Маленькое уточнение!',
                                                                                    text: 'Вы точно хотите удалить товар?',
                                                                                    showCancelButton: true,
                                                                                    confirmButtonColor: '#3085d6',
                                                                                    cancelButtonColor: '#d33',
                                                                                    cancelButtonText: 'Нет, не хочу!',
                                                                                    confirmButtonText: 'Да, хочу!'
                                                                                }).then((result) => {
                                                                                    if (result.isConfirmed) {
                                                                                        removeCartItem(cart.cartId, device.id).then(() => {
                                                                                            Swal.fire(
                                                                                                'Удалено!',
                                                                                                'Данный товар был удален из корзины',
                                                                                                'success'
                                                                                            )
                                                                                            const updatedClientOrder = clientOrder.filter(order => order.id !== device.id);
                                                                                            setClientOrder(updatedClientOrder);
                                                                                        })
                                                                                        history(`${CART_ROUTE}/${cart.cartId}`)
                                                                                    }
                                                                                })
                                                                            }}>
                                                                        <Delete/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    <div className="cart-description">
                                        <div className="cart-description__title">
                                            <p>Сумма заказа</p>
                                            <p>Без учета стоимости доставки</p>
                                        </div>
                                        <div className="cart-description__total">{totalCost} ₽</div>
                                        <button onClick={handleOrderClick}
                                                className="btn-reset cart-description__btn">
                                            Оформить заказ
                                        </button>
                                        <p className="cart-description__help">
                                            Нужна помощь или есть вопрос?
                                        </p>
                                        <div className="cart-description__socials">
                                            <NavLink to={process.env.REACT_APP_TG_LINK}>
                                                <Telegram/>
                                            </NavLink>
                                            <NavLink to={process.env.REACT_APP_WA_LINK}>
                                                <WhatsApp/>
                                            </NavLink>
                                        </div>
                                        <ul className="cart-description__phone">
                                            <NavLink to={"tel:89999999999"}>
                                                +7 (999) 999-99-99
                                            </NavLink>
                                            <NavLink to={"tel:89999999999"}>
                                                +7 (999) 999-99-99
                                            </NavLink>
                                        </ul>
                                    </div>
                                </div>
                                <div className="cart__complete">
                                    <div className="cart__complete-form form">
                                        <div className="form__list">
                                            <div className="form__list--item">
                                                <button onClick={handleOrderClick}
                                                        className="btn__payment btn-reset">
                                                    Оформить заказ
                                                </button>
                                            </div>
                                            <div className="form__list--item">
                                                <span className="total__price">Общая цена: {totalCost} рублей</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                        :
                        <div className="no-devices">
                            Корзина пуста!
                        </div>

                }
            </div>
        </div>
    )
});

export default Cart
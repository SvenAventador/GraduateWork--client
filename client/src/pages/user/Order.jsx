import React from "react";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import queryString from 'query-string';
import {CART_ROUTE, MAIN_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {ReactComponent as Telegram} from "../../assets/svg/cart/tg.svg";
import {ReactComponent as WhatsApp} from "../../assets/svg/cart/wa.svg";
import {Select} from "antd";
import {updateData} from "../../http/userApi";
import InputMask from 'react-input-mask';
import {createMyOrder} from "../../http/orderApi";
import Swal from "sweetalert2";

const order = [
    {
        id: 1,
        price: 'от 350 ₽',
        description: 'Стандартная доставка по Казани в пределах города. \n' +
            'Стандартная курьерская доставка по Казани в пределах города (доставка осуществляется с 10.00 до 23.00) ' +
            'Доставка крупногабаритных товаров (игровые приставки и т.п.) оплачивается по тарифу в 1000 р.'
    },
    {
        id: 2,
        price: 'от 500 ₽',
        description: 'Стандартная доставка по Казани за город. Рассчитывается оператором - 30р. каждый километр от город, минимум 500р.'
    },
    {
        id: 3,
        price: 'от 500 ₽',
        description: 'Доставка в регион службой EMS. ' +
            'Для заказов суммой до 50 000 рублей. ' +
            'Доставка в любой регион России службой EMS. ' +
            'Минимальная стоимость доставки составляет 500 рублей, ' +
            'итоговую стоимость товара и доставки вам сообщит менеджер в личном письме после обработки заказа.'
    }
]


const Order = () => {
    const {user} = React.useContext(Context)
    const {search} = useLocation();
    const {clientOrder, totalCost} = queryString.parse(search);
    const [selectId, setSelectId] = React.useState(null)
    const history = useNavigate()
    let myOrder = JSON.parse(clientOrder)

    const [userFio, setUserFio] = React.useState(user.user.userFio || '')
    const [userEmail, setUserEmail] = React.useState(user.user.userEmail || '')
    const [userPhone, setUserPhone] = React.useState(user.user.userPhone || '')
    const [userComment, setUserComment] = React.useState('')

    const [userStreet, setUserStreet] = React.useState('')
    const [userHouseNumber, setUserHouseNumber] = React.useState('')
    const [userRoomNumber, setUserRoomNumber] = React.useState('')
    const [userAdditional, setUserAdditional] = React.useState('')

    const fullAddress = userStreet + ' ' + userHouseNumber + ' ' + userRoomNumber

    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    const phoneRegex = /^(\+7|8)?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/
    const digitalRegex = /^\d+$/

    const changeSelectId = (value, option) => {
        setSelectId(option.id)
    }

    const createFullOrder = async () => {
        if (userFio === '' || userFio.split(' ') < 2) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректное ФИО"
            })
        }

        if (!user.user.userEmail && (userEmail === '' || !emailRegex.test(userEmail))) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректную почту!"
            })
        }

        if (!user.user.userPhone && (userPhone === '' || !phoneRegex.test(userPhone))) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректный мобильный телефон!"
            })
        }

        if (userStreet === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректную улицу проживания!"
            })
        }

        if (userHouseNumber === '' || !digitalRegex.test(userHouseNumber)) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректный номер дома!"
            })
        }

        if (userRoomNumber === '' || !digitalRegex.test(userRoomNumber)) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректный номер квартиры!"
            })
        }

        if (!selectId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, выберите корректный тип оплаты!"
            })
        }

        let data;

        try {
            data = await updateData(user.user.id, user.user.userName, userEmail, userFio, fullAddress, userPhone)
            user.setUser(data)
            user.setIsAuth(true)

            createMyOrder(user.user.id, parseInt(selectId), totalCost).then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: data.message
                }).then(() => {
                    history(MAIN_ROUTE)
                })
            })
        } catch (e) {
            return Swal.fire({
                icon: "error",
                title: "Ошибочка",
                text: e.response.data.message
            })
        }
    }

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        history(MAIN_ROUTE)
    }

    return (
        <div className="order-container">
            <div className="order__title">Оформление заказа</div>
            <div className="order site-container">
                <div className="order__left">
                    <div className="order-customer">
                        <div className="order-customer__title">Покупатель</div>
                        <div className="order-customer__info">
                            <p>Данные покупателя взяты из личного кабиента. Если это не вы, необходимо</p>
                            <button className="btn-reset" onClick={logout}>сменить аккаунт.</button>
                        </div>
                        <div className="order-customer__personal">
                            <div className="order-customer__personal--field">
                                <input type="text"
                                       id="yourName"
                                       value={userFio}
                                       disabled={!!user.user.userFio}
                                       onChange={(e) => setUserFio(e.target.value)}
                                       required="required"
                                       autoComplete="false"/>
                                <label style={{display: user.user.userFio ? "none" : ""}} htmlFor="yourName">ФИО</label>
                            </div>
                            <div className="order-customer__personal--field">
                                <input type="text"
                                       id="yourEmail"
                                       disabled={!!user.user.userEmail}
                                       required="required"
                                       value={userEmail}
                                       onChange={(e) => setUserEmail(e.target.value)}
                                       autoComplete="false"/>
                                <label style={{display: user.user.userEmail ? "none" : ""}}
                                       htmlFor="yourEmail">Почта</label>
                            </div>
                            <div className="order-customer__personal--field">
                                <InputMask type="text"
                                           mask="+7 (999) 999 99-99"
                                           id="yourPhone"
                                           required="required"
                                           value={userPhone}
                                           disabled={!!user.user.userPhone}
                                           onChange={(e) => setUserPhone(e.target.value)}
                                           autoComplete="false"/>
                                <label style={{display: user.user.userPhone ? "none" : ""}}
                                       htmlFor="yourPhone">Телефон</label>
                            </div>
                            <div className="order-customer__personal--field">
                                <input type="text"
                                       required="required"
                                       value={userComment}
                                       onChange={(e) => setUserComment(e.target.value)}
                                       id="yourComment"
                                       autoComplete="false"/>
                                <label htmlFor="yourComment">Комментарий</label>
                            </div>
                        </div>
                    </div>
                    <div className="order-payment">
                        <div className="order-payment__title">Получение заказа</div>
                        <div className="order-payment__personal">
                            <div className="order-payment__personal--field">
                                <input type="text"
                                       id="yourStreet"
                                       value={userStreet}
                                       onChange={(e) => setUserStreet(e.target.value)}
                                       required="required"
                                       autoComplete="false"/>
                                <label htmlFor="yourStreet">Улица</label>
                            </div>
                            <div className="order-payment__personal--field">
                                <input type="text"
                                       id="yourHouse"
                                       value={userHouseNumber}
                                       onChange={(e) => setUserHouseNumber(e.target.value)}
                                       required="required"
                                       autoComplete="false"/>
                                <label htmlFor="yourHouse">№ дома</label>
                            </div>
                            <div className="order-payment__personal--field">
                                <input type="text"
                                       id="yourHouse"
                                       value={userRoomNumber}
                                       onChange={(e) => setUserRoomNumber(e.target.value)}
                                       required="required"
                                       autoComplete="false"/>
                                <label htmlFor="yourHouse">№ квартиры или офиса</label>
                            </div>
                            <div className="order-payment__personal--field">
                                <input type="text"
                                       id="yourDescription"
                                       value={userAdditional}
                                       onChange={(e) => setUserAdditional(e.target.value)}
                                       required="required"
                                       autoComplete="false"/>
                                <label htmlFor="yourDescription">Код домофона, этаж, подьезд. Что-то такое, что упростит
                                    нелегкую работу курьера</label>
                            </div>
                            <div className="order-payment__personal--field">
                                <Select
                                    defaultValue="Выберите тип оплаты"
                                    onChange={changeSelectId}
                                    style={{
                                        width: 400,
                                        border: "none",
                                    }}
                                    options={[
                                        {
                                            id: 1,
                                            value: 'Наличными',
                                            label: 'Наличными'
                                        },
                                        {
                                            id: 2,
                                            value: 'Банковской картой',
                                            label: 'Банковской картой'
                                        },
                                        {
                                            id: 3,
                                            value: 'Банковской картой при получении',
                                            label: 'Банковской картой при получении'
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"order-card"}>
                        {
                            order.map((item) => (
                                <div className="order-card__description"
                                     key={item.id}>
                                    <div className="order-card__description--price">{item.price}</div>
                                    <div className="order-card__description--info">{item.description}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="order-payment__create">
                        <button className="order-payment__create--btn btn-reset"
                                onClick={createFullOrder}>
                            Оформить заказ
                        </button>
                        <NavLink className="order-payment__create--link"
                                 to={`${CART_ROUTE}/${user.user.id}`}>Назад, в корзину</NavLink>
                    </div>
                </div>
                <div className="order__right">
                    <div className="order__right--title">Заказ</div>
                    <div className="order__right--images">
                        <ul className="order__right--images-list">
                            {
                                myOrder.map((device) => (
                                    <li className="order__right--images-item"
                                        key={device.id}>
                                        <img
                                            src={`${process.env.REACT_APP_API_PATH}/${device.images[0].imagePath}`}
                                            alt="images device"
                                            aria-label="device images"/>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="order__right--description">
                        <div className="order__right--description-count">Кол-во: {myOrder.length} </div>
                        <div className="sep"></div>
                        <div className="order__right--description-price">{totalCost}₽</div>
                    </div>
                    <div className="order__right--finish">
                        <p>Итого</p>
                        <p>{totalCost}₽</p>
                    </div>
                    <div className="order__right--back">
                        <NavLink to={`${CART_ROUTE}/${user.user.id}`}>
                            &lt; Редактировать заказ
                        </NavLink>
                    </div>
                    <p className="order__right--help">
                        Нужна помощь или есть вопрос?
                    </p>
                    <div className="order__right--socials">
                        <NavLink to={process.env.REACT_APP_TG_LINK}>
                            <Telegram/>
                        </NavLink>
                        <NavLink to={process.env.REACT_APP_WA_LINK}>
                            <WhatsApp/>
                        </NavLink>
                    </div>
                    <ul className="order__right--phone">
                        <NavLink to={"tel:89999999999"}>
                            +7 (999) 999-99-99
                        </NavLink>
                        <NavLink to={"tel:89999999999"}>
                            +7 (999) 999-99-99
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Order;

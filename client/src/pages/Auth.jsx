import React from 'react';

import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, DEVICES_ROUTE} from "../utils/consts";

import logo from '../assets/images/auth/logo.png'
import close from '../assets/images/auth/btn_close.png'
import {registration, login} from "../http/userApi";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const {user} = React.useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repeatPassword, setRepeatPassword] = React.useState('')

    /**
     * Регистрация пользователя.
     * @return {Promise<SweetAlertResult<Awaited<any>>>}
     */
    const regUser = async () => {
        let data;
        try {
            if (password === repeatPassword) {
                data = await registration(name, email, password)
                user.setUser(data)
                user.setIsAuth(true)
                return Swal.fire({
                    icon: "success",
                    title: "Успешно",
                    text: "Поздравляем с успешной регистрацией!"
                }).then(() => {
                    history(DEVICES_ROUTE, {replace: true})
                })
            } else {
                return Swal.fire({
                    icon: "error",
                    title: "Ошибочка",
                    text: "Введенные Вами пароли не совпадают!"
                })
            }
        } catch (e) {
            return Swal.fire({
                icon: "error",
                title: "Ошибочка",
                text: JSON.stringify(e.response.data.error)
            })
        }
    }

    /**
     * Авторизация пользователя.
     * @return {Promise<SweetAlertResult<Awaited<any>>>}
     */
    const loginUser = async () => {
        let data;
        try {
            data = await login(email, password)
            user.setUser(data)
            user.setIsAuth(true)
            return Swal.fire({
                icon: "success",
                title: "Успешно",
                text: "Добро пожаловать!"
            }).then(() => {
                history(DEVICES_ROUTE, {replace: true})
            })
        } catch (e) {
            return Swal.fire({
                icon: "error",
                title: "Ошибочка",
                text: e.response.data
            })
        }
    }

    return (
        <div className="auth-container  ">
            <div className="auth auth-content site-container">
                <div className="auth-logo">
                    <div className="auth-logo__img">
                        <img src={logo}
                             alt="Логотип компании"
                             aria-label="Логотип компании"/>
                    </div>
                    <div className="auth-logo__text">
                        TechnoWorld
                    </div>
                </div>
                <div className="auth-form">
                    <div className="auth-form__close">
                        <button className="btn-reset"
                                onClick={() => history(DEVICES_ROUTE)}>
                            <img src={close}
                                 alt="Закрыть модальное окно авторизации"
                                 aria-label="Закрыть модальное окно авторизации"/>
                        </button>
                    </div>

                    <div className="auth-form__title">
                        <h1>{isLogin ? "Авторизация" : "Регистрация"}</h1>
                    </div>

                    {
                        (!isLogin) &&
                        <div className="auth-form__data">
                            <input type="text"
                                   id="name"
                                   required="required"
                                   value={name}
                                   maxLength={10}
                                   autoComplete="false"
                                   onChange={event => setName(event.target.value)}/>
                            <label htmlFor="name">Введите Ваше имя</label>
                        </div>
                    }

                    <div className="auth-form__data">
                        <input id="email"
                               type="text"
                               required="required"
                               value={email}
                               autoComplete="false"
                               onChange={event => setEmail(event.target.value)}/>
                        <label htmlFor="firstname">Введите Вашу почту</label>
                    </div>

                    <div className="auth-form__data">
                        <input type="password"
                               id="password"
                               required="required"
                               value={password}
                               autoComplete="false"
                               onChange={event => setPassword(event.target.value)}/>
                        <label htmlFor="password">Введите Ваш пароль</label>
                    </div>

                    {
                        !(isLogin) &&
                        <div className="auth-form__data">
                            <input type="password"
                                   id="repeatPassword"
                                   required="required"
                                   autoComplete="false"
                                   value={repeatPassword}
                                   onChange={event => setRepeatPassword(event.target.value)}/>
                            <label htmlFor="repeatPassword">Повторите Ваш пароль</label>
                        </div>
                    }

                    {
                        isLogin ?
                            <div className="auth-form__bottom">
                                <button className="auth-form__bottom--btn btn-reset"
                                        onClick={() => loginUser()}>
                                    Войти в аккаунт
                                </button>
                                <div className="auth-form__bottom-info">
                                    <div className="auth-form__bottom-info--title">
                                        <h3>
                                            Впервые у нас?
                                        </h3>
                                        <NavLink to={REGISTRATION_ROUTE}
                                                 className="auth-form__bottom-info--link">
                                            Зарегистрируйтесь!
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="auth-form__bottom">
                                <button className="auth-form__bottom--btn btn-reset"
                                        onClick={() => regUser()}>
                                    Зарегистрироваться
                                </button>
                                <div className="auth-form__bottom-info">
                                    <div className="auth-form__bottom-info--title">
                                        <h3>Уже знакомы с нами?</h3>
                                        <NavLink to={LOGIN_ROUTE} className="auth-form__bottom-info--link">
                                            Войдите!
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                    }
                </div>

            </div>
        </div>
    );
});

export default Auth;
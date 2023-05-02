import React from 'react';

import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

import logo from '../assets/images/auth/logo.png'
import close from '../assets/images/auth/btn_close.png'

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

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
                <form className="auth-form">
                    <div className="auth-form__close">
                        <button className="btn-reset">
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
                            <input type="text" id="name" required="required"/>
                            <label htmlFor="name">Введите Ваше имя</label>
                        </div>
                    }

                    <div className="auth-form__data">
                        <input id="email" type="text" required="required"/>
                        <label htmlFor="firstname">Введите Вашу почту</label>
                    </div>

                    <div className="auth-form__data">
                        <input type="text" id="password" required="required"/>
                        <label htmlFor="password">Введите Ваш пароль</label>
                    </div>

                    {
                        !(isLogin) &&
                        <div className="auth-form__data">
                            <input type="text" id="repeatPassword" required="required"/>
                            <label htmlFor="repeatPassword">Повторите Ваш пароль</label>
                        </div>
                    }

                    {
                        isLogin ?
                            <div className="auth-form__bottom">
                                <button className="auth-form__bottom--btn btn-reset">
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
                                <button className="auth-form__bottom--btn btn-reset">
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
                </form>

            </div>
        </div>
    );
};

export default Auth;
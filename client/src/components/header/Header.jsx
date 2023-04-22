import React from 'react';
import {NavLink} from "react-router-dom";
import {
    ABOUT_ROUTE,
    CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    FINDUS_ROUTE,
    GUARANTEE_ROUTE,
    LOYAL_CUSTOMERS_ROUTE,
    MAIN_ROUTE,
    TRADE_IN_ROUTE,
    LOGIN_ROUTE,
    CART_ROUTE
} from "../../utils/consts";

import {ReactComponent as WhatsApp} from '../../assets/svg/header/wa.svg'
import {ReactComponent as Telegram} from '../../assets/svg/header/tg.svg'
import {ReactComponent as Auth} from '../../assets/svg/header/auth.svg'
import {ReactComponent as Cart} from '../../assets/svg/header/cart.svg'

import logo from '../../assets/images/logo.png'
import BurgerMenu from "./BurgerMenu";
import SearchForm from "./SearchForm";

const Header = () => {
    return (
        <header className="header site-container">

            <div className="header-top">

                <nav className="header-top-nav nav-header-top"
                     aria-label={"Навигационная панель"}>
                    <ul className="nav-header-top__list">
                        <li className="nav-header-top__item">
                            <NavLink to={ABOUT_ROUTE}
                                     className="nav-header-top__link">
                                О компании
                            </NavLink>
                        </li>
                        <li className="nav-header-top__item">
                            <NavLink to={DELIVERY_ROUTE}
                                     className="nav-header-top__link">
                                Доставка
                            </NavLink>
                        </li>
                        <li className="nav-header-top__item">
                            <NavLink to={GUARANTEE_ROUTE}
                                     className="nav-header-top__link">
                                Гарантия
                            </NavLink>
                        </li>
                        <li className="nav-header-top__item">
                            <NavLink to={TRADE_IN_ROUTE}
                                     className="nav-header-top__link">
                                Trade In
                            </NavLink>
                        </li>
                        <li className="nav-header-top__item">
                            <NavLink to={LOYAL_CUSTOMERS_ROUTE}
                                     className="nav-header-top__link">
                                Постоянным клиентам
                            </NavLink>
                        </li>
                        <li className="nav-header-top__item">
                            <NavLink to={CONTACTS_ROUTE}
                                     className="nav-header-top__link">
                                Контакты
                            </NavLink>
                        </li>
                        <li className="nav-header-top__item">
                            <NavLink to={FINDUS_ROUTE}
                                     className="nav-header-top__link">
                                Как нас найти
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <ul className="header-top-socials socials-header-top">
                    <li className="socials-header-top__item">
                        <NavLink to={process.env.REACT_APP_WA_LINK}
                                 className="socials-header-top__link">
                            <WhatsApp />
                        </NavLink>
                    </li>
                    <li className="socials-header-top__item">
                        <NavLink to={process.env.REACT_APP_TG_LINK}
                                 className="socials-header-top__link">
                            <Telegram />
                        </NavLink>
                    </li>
                    <li className="socials-header-top__item">
                        <NavLink to={"tel:89999999999"}
                                 className="socials-header-top__link">
                            +7 (999) 999-99-99
                        </NavLink>
                    </li>
                    <li className="socials-header-top__item">
                        <NavLink to={"tel:89999999999"}
                                 className="socials-header-top__link">
                            +7 (999) 999-99-99
                        </NavLink>
                    </li>
                </ul>

            </div>

            <div className="header-bottom">

                <NavLink to={MAIN_ROUTE}
                         className="header-bottom__logo">
                    <img className="header-bottom__logo-image"
                         src={logo}
                         alt="Логотип сайта"
                         aria-label="Логотип компании TechnoWorld"/>
                </NavLink>

                <BurgerMenu />

                <SearchForm />

                <div className="header-bottom__cart">
                    <NavLink to={CART_ROUTE + '/1'} className="header-bottom__cart-link">
                        <div className="header-bottom__cart-button--img">
                            <Cart />
                        </div>
                        <div className="header-bottom__cart-button--text">
                            <p>Корзина</p>
                        </div>
                    </NavLink>
                </div>

                <div className="header-bottom__auth">
                    <NavLink to={LOGIN_ROUTE} className="header-bottom__auth-link">
                        <div className="header-bottom__auth-button--img">
                            <Auth />
                        </div>
                        <div className="header-bottom__auth-button--text">
                            <p>Войти</p>
                        </div>
                    </NavLink>
                </div>

            </div>

        </header>
    );
};

export default Header;
import React from 'react';

import {ReactComponent as WhatsApp} from '../../assets/svg/header/wa.svg'
import {ReactComponent as Telegram} from '../../assets/svg/header/tg.svg'

import {NavLink} from "react-router-dom";

import {
    ABOUT_ROUTE,
    CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    FINDUS_ROUTE,
    GUARANTEE_ROUTE,
    LOYAL_CUSTOMERS_ROUTE,
    TRADE_IN_ROUTE
} from "../../utils/consts";

const Footer = () => {
    const currentDate = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-left">
                    <p className="footer-left__contact-info">
                        Всегда с Вами на связи!
                    </p>
                    <div className="footer-left__socials">
                        <NavLink to={process.env.REACT_APP_WA_LINK}
                                 className="footer-left__socials--link">
                            <WhatsApp/>
                        </NavLink>
                        <NavLink to={process.env.REACT_APP_TG_LINK}
                                 className="footer-left__socials--link">
                            <Telegram/>
                        </NavLink>
                    </div>
                    <div className="footer-left__phones">
                        <NavLink to={"tel:89999999999"}
                                 className="footer-left__phones--link">
                            +7 (999) 999-99-99
                        </NavLink>
                        <NavLink to={"tel:89999999999"}
                                 className="footer-left__phones--link">
                            +7 (999) 999-99-99
                        </NavLink>
                    </div>
                </div>

                <div className="footer-right">
                    <nav className="footer-right-nav"
                         aria-label={"Навигационная панель"}>
                        <ul className="footer-right-nav__list">
                            <li className="footer-right-nav__item">
                                <NavLink to={ABOUT_ROUTE}
                                         className="footer-right-nav__link">
                                    О компании
                                </NavLink>
                            </li>
                            <li className="footer-right-nav__item">
                                <NavLink to={DELIVERY_ROUTE}
                                         className="footer-right-nav__link">
                                    Доставка
                                </NavLink>
                            </li>
                            <li className="footer-right-nav__item">
                                <NavLink to={GUARANTEE_ROUTE}
                                         className="footer-right-nav__link">
                                    Гарантия
                                </NavLink>
                            </li>
                            <li className="footer-right-nav__item">
                                <NavLink to={TRADE_IN_ROUTE}
                                         className="footer-right-nav__link">
                                    Trade In
                                </NavLink>
                            </li>
                            <li className="footer-right-nav__item">
                                <NavLink to={LOYAL_CUSTOMERS_ROUTE}
                                         className="footer-right-nav__link">
                                    Постоянным клиентам
                                </NavLink>
                            </li>
                            <li className="footer-right-nav__item">
                                <NavLink to={CONTACTS_ROUTE}
                                         className="footer-right-nav__link">
                                    Контакты
                                </NavLink>
                            </li>
                            <li className="footer-right-nav__item">
                                <NavLink to={FINDUS_ROUTE}
                                         className="footer-right-nav__link">
                                    Как нас найти
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className="footer-right__copyright">
                        &copy; {currentDate} Маркетплейс TechnoWorld
                    </div>

                    <div className="footer-right__description">
                        Сайт носит сугубо информационный характер и не является публичной офертой,
                        определяемой Статьей 437 (2) ГК РФ.
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
import React from 'react';
import {NavLink} from "react-router-dom";
import {DEVICES_ROUTE} from "../../utils/consts";

import phone from '../../assets/images/main-categories/main_phone.jpg'
import tablet from '../../assets/images/main-categories/main_tablet.png'
import laptop from '../../assets/images/main-categories/main-laptop.png'


const Categories = () => {
    return (
        <div className={"categories"}>

            <NavLink to={DEVICES_ROUTE}
                     className="categories-left categories__style">
                <div className="categories-left__text">
                    <p className={"categories-left__text--title"}>
                        Телефоны
                    </p>
                    <p className={"categories-left__text--description"}>
                        Модели на&nbsp;любой вкус:
                        от&nbsp;самых бюджетных
                        до&nbsp;флагманских
                    </p>
                </div>
                <img src={phone}
                     alt="Phone"
                     aria-label={"Phone photo"}
                     className={"categories-left__image"}/>
            </NavLink>

            <div className="categories-right">
                <NavLink to={DEVICES_ROUTE}
                         className="categories-right-top categories__style">
                    <div className="categories-right-top__text">
                        <p className={"categories-right-top__text--title"}>
                            Планшеты
                        </p>
                    </div>
                    <img src={tablet}
                         alt="Tablet"
                         aria-label={"Tablet photo"}
                         className={"categories-right-top__image"}/>
                </NavLink>
                <NavLink to={DEVICES_ROUTE}
                         className="categories-right-bottom categories__style">
                    <div className="categories-right-bottom__text">
                        <p className={"categories-right-bottom__text--title"}>
                            Ноутбуки
                        </p>
                    </div>
                    <img src={laptop}
                         alt="Tablet"
                         aria-label={"Tablet photo"}
                         className={"categories-right-bottom__image"}/>
                </NavLink>
            </div>

        </div>
    );
};

export default Categories;
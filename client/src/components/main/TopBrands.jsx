import React from 'react';
import {NavLink} from "react-router-dom";
import {DEVICES_ROUTE} from "../../utils/consts";

import apple from '../../assets/images/top-brand/apple.png'
import google from '../../assets/images/top-brand/google.png'
import huawei from '../../assets/images/top-brand/huawei.png'
import oneplus from '../../assets/images/top-brand/opeplus.png'
import samsung from '../../assets/images/top-brand/samsung.png'
import sony from '../../assets/images/top-brand/sony.png'
import xiaomi from '../../assets/images/top-brand/xiaomi.png'

const TopBrands = () => {
    return (
        <div className="brands site-container">
            <p className="brands__title">
                Топ бренды
            </p>
            <ul className="brands__list">
                <li className="brands__item">
                    <NavLink to={DEVICES_ROUTE}>
                        <img src={apple}
                             alt="Изображение логотипа Apple"
                             aria-label={"Логотип Apple"} />
                    </NavLink>
                </li>
                <li className="brands__item">
                    <NavLink to={DEVICES_ROUTE}>
                        <img src={google}
                             alt="Изображение логотипа Google"
                             aria-label={"Логотип Google"} />
                    </NavLink>
                </li>
                <li className="brands__item">
                    <NavLink to={DEVICES_ROUTE}>
                        <img src={huawei}
                             alt="Изображение логотипа Huawei"
                             aria-label={"Логотип Huawei"} />
                    </NavLink>
                </li>
                <li className="brands__item">
                    <NavLink to={DEVICES_ROUTE}>
                        <img src={oneplus}
                             alt="Изображение логотипа OnePlus"
                             aria-label={"Логотип OnePlus"} />
                    </NavLink>
                </li>
                <li className="brands__item">
                    <NavLink to={DEVICES_ROUTE}>
                        <img src={samsung}
                             alt="Изображение логотипа Samsung"
                             aria-label={"Логотип Samsung"} />
                    </NavLink>
                </li>
                <li className="brands__item">
                    <NavLink to={DEVICES_ROUTE}>
                        <img src={sony}
                             alt="Изображение логотипа Sony"
                             aria-label={"Логотип Sony"} />
                    </NavLink>
                </li>
                <li className="brands__item">
                    <NavLink to={DEVICES_ROUTE}>
                        <img src={xiaomi}
                             alt="Изображение логотипа Xiaomi"
                             aria-label={"Логотип Xiaomi"} />
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default TopBrands;
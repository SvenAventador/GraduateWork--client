import React from 'react';

import {ReactComponent as Rating} from "../../../assets/svg/main/advantages/rating.svg";
import {ReactComponent as Warranty} from "../../../assets/svg/main/advantages/warranty.svg";
import {ReactComponent as CashBack} from "../../../assets/svg/main/advantages/cashback.svg";
import {ReactComponent as Location} from "../../../assets/svg/main/advantages/geo.svg";
import {ReactComponent as Safety} from "../../../assets/svg/main/advantages/safety.svg";

import AdvantagesList from "./component/AdvantagesList";

const Advantages = () => {
    const items = [
        {
            title: 'Безупречный рейтинг на маркетплейсах',
            image: <Rating />,
            description: 'Вероятно, выбор нашего магазина вас не разочарует. ' +
                         'У 24 тысяч клиентов дошли руки оценить нас на Яндекс.Маркете, ' +
                         '94% купили бы у нас снова.'
        },
        {
            title: 'Железобетонная гарантия',
            image: <Warranty />,
            description: 'Качество товара закладывает производитель, бывает, что телефоны ломаются. ' +
                         'Мы дорожим репутацией и не станем от вас бегать. ' +
                         'Все гарантийные обязательства будут выполнены. ' +
                         'А в течение 14 дней после покупки возвращаем деньги за новый товар без объяснения причин, ' +
                         'даже если “просто расхотелось”.'
        },
        {
            title: 'Даем кэшбэк 1,5%',
            image: <CashBack />,
            description: 'Деньги вернутся на ваш счет, ими можно оплатить до 50% любого товара.'
        },
        {
            title: 'Фирменный магазин на Большой Красной 55',
            image: <Location />,
            description: 'Наш магазинчик находится на большой Красной 55 в нескольких километрах от метро “Площадь Тукая”.'
        },
        {
            title: 'Наш магазин только начинает свой путь!',
            image: <Safety />,
            description: 'Несмотря на то, что нам мало лет, у нас было время разобраться в телефонах. Скорее всего, продадим что-то стоящее.'
        }
    ]


    return (
        <div className="advantages">
            <div className="advantages-container">
                <div className="advantages__title">
                    Наши преимущества
                </div>
                <AdvantagesList items={items} />
            </div>
        </div>
    );
};

export default Advantages;


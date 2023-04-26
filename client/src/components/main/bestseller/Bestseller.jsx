import React from 'react';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image from "../../../assets/images/top-brand/opeplus.png"
import {ReactComponent as Cart} from '../../../assets/svg/header/cart.svg'

import {CURRENT_DEVICE_ROUTE, settings} from "../../../utils/consts";
import {useNavigate} from "react-router-dom";
import BestsellerItem from "./BestsellerItem";

const device = [
    {
        id: 1,
        name: "first",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    },
    {
        id: 2,
        name: "second",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    },
    {
        id: 3,
        name: "third",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    },
    {
        id: 4,
        name: "fourst",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    },
    {
        id: 5,
        name: "five",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    },
    {
        id: 6,
        name: "six",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    },
    {
        id: 7,
        name: "six",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    },
    {
        id: 8,
        name: "six",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    }  ,
    {
        id: 9,
        name: "six",
        brand: "sdifsdhf",
        price: 123,
        image: image,
        cart: <Cart />
    }
]

const Bestseller = () => {
    const history = useNavigate()

    return (
        <div className="bestseller site-container">

            <p className="bestseller__title">
                Хиты продаж
            </p>

            <div className="card">
            <Slider {...settings}>
                {
                    device.map(item => (
                        <BestsellerItem key={item.id}
                                        id={item.id}
                                        image={item.image}
                                        name={item.name}
                                        brand={item.brand}
                                        price={item.price}
                                        cart={item.cart}
                                        onClick={() => history(CURRENT_DEVICE_ROUTE + '/' + item.id)} />
                    ))
                }
            </Slider>
            </div>
        </div>
    );
};

export default Bestseller;
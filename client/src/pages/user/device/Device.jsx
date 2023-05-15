import React from 'react';
import ImageSlider from "./ImageSlider";
import {Rate} from "antd";
import {observer} from "mobx-react-lite";
import {getOneBrand, getOneDevice} from "../../../http/deviceApi";
import {Context} from "../../../index";
import {useParams} from "react-router-dom";
import {StarFilled} from "@ant-design/icons";
import {ReactComponent as Heart} from "../../../assets/svg/device/heart.svg";
import {createMark} from "../../../http/ratingApi";
import Swal from "sweetalert2";
import {createCartItem, getCartId} from "../../../http/cartApi";

const Device = observer(() => {
    const {user, cart} = React.useContext(Context)
    const [device, setDevice] = React.useState({info: [], images: []})
    const [brand, setBrand] = React.useState('')
    const [value, setValue] = React.useState(null)
    const [favourite, setFavourite] = React.useState(false)
    const {id} = useParams()

    React.useEffect(() => {
        if (typeof user.user.id !== 'undefined' && typeof user.user.id === 'number') {
            getOneDevice(id, user.user.id).then((data) => {
                setDevice(data);
                setValue(data.ratings[0].rate || 0);
            });
        } else if (!user.user.id) {
            getOneDevice(id, user.user.id).then((data) => {
                setDevice(data);
                setValue(0);
            });
        }

        getOneBrand(device.brandId).then((data) => {
            setBrand(data.brandName)
        })
    }, [device.brandId, device.id, id, user.user.id]);

    React.useEffect(() => {
        if (user.isAuth) {
            getCartId(user.user.id).then(cartId => {
                cart.setCartId(cartId)
            })
        }
    }, [user.isAuth, user.user.id, cart])
    console.log(cart.cartId)

    const createNewMark = (mark) => {
        createMark(user.user.id, id, mark).then((data) => {
            return Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: data.message
            })
        })
    }

    React.useEffect(() => {
        setFavourite(false)
        let devices = JSON.parse(localStorage.getItem(`favouriteDevices_${user.user.id}`)) || [];
        const index = devices.findIndex(d => d.id === device.id);
        if (index >= 0) {
            setFavourite(true)
        }
    }, [device.id, user.user.id])

    function toggleFavourite() {
        let devices = JSON.parse(localStorage.getItem(`favouriteDevices_${user.user.id}`)) || [];
        const index = devices.findIndex(d => d.id === device.id);

        if (index >= 0) {
            devices.splice(index, 1);
            setFavourite(false)
        } else {
            devices.push(device);
            setFavourite(true)
        }

        localStorage.setItem(`favouriteDevices_${user.user.id}`, JSON.stringify(devices));
    }

    return (
        <div className="device-info site-container">
            <div className="device-info__top">
                <div className="device-info__left">
                    <ImageSlider images={device.images}/>
                </div>
                <div className="device-info__right">
                    <div className="device-info__right--name">
                        {brand + " " + device.deviceName}
                    </div>

                    <div className="device-info__right--action">
                        <Rate value={value}
                              disabled={!user.user.id}
                              onChange={(newValue) => {
                                  setValue((prevValue) => (prevValue === newValue ? null : newValue));
                                  createNewMark(newValue);
                              }}
                              character={<StarFilled style={{fontSize: '40px'}}/>}/>
                        {
                            user.user.id ?
                                <div
                                    className={favourite ? "device-info__right--action-favourite--active" : "device-info__right--action-favourite"}
                                    onClick={() => toggleFavourite()}>
                                    <Heart/>
                                </div>
                                :
                                <div
                                    className={favourite ? "device-info__right--action-favourite--active" : "device-info__right--action-favourite"}
                                    onClick={() => {
                                        return Swal.fire({
                                            icon: 'error',
                                            title: 'Внимание!',
                                            text: 'Добавлять в избранное может только авторизированный пользователь!'
                                        })
                                    }}>
                                    <Heart/>
                                </div>
                        }
                    </div>

                    <div className="device-info__right--description">
                        {device.deviceDescription}
                    </div>

                    <div className="device-info__right--buy">
                        <div className="device-info__right--buy-price">
                            {device.devicePrice} ₽
                        </div>
                        <div className="device-info__right--separator"></div>
                        {
                            user.user.id ?
                                <button className="device-info__right--buy-btn btn-reset"
                                        onClick={(event) => {
                                            createCartItem(cart.cartId, +id)
                                                .then((data) => {
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: 'Ваушки!',
                                                        text: data.message,
                                                    });
                                                });
                                        }}>
                                    Добавить в корзину
                                </button>
                                :
                                <button className="device-info__right--buy-btn btn-reset"
                                        onClick={() => {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Внимание!',
                                                text: 'Товары могут приобретать только авторизированные пользователи!',
                                            });
                                        }}>
                                    Добавить в корзину
                                </button>
                        }
                    </div>
                </div>
            </div>
            <div className="device-info__bottom">
                <p className="device-info__bottom--title">Характеристики</p>
                {device.info.map((info) =>
                    <div className="device-info__characteristics" key={info.id}>
                        <div className="device-info__characteristics--name">
                            {info.infoTitle}
                        </div>
                        <div className="device-info__characteristics--description">
                            {info.infoDescription}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Device;
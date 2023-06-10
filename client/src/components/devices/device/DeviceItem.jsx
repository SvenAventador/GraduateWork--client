import React, {useContext, useEffect, useState} from 'react';
import {getOneBrand, putMark} from "../../../http/deviceApi";
import {useNavigate} from "react-router-dom";
import {CURRENT_DEVICE_ROUTE} from "../../../utils/consts";
import {ReactComponent as Stars} from "../../../assets/svg/device/stars.svg";
import {ReactComponent as Cart} from "../../../assets/svg/device/cart.svg";
import {createCartItem} from "../../../http/cartApi";
import {Context} from "../../../index";
import Swal from "sweetalert2";
import {TailSpin} from "react-loader-spinner";

const DeviceItem = ({device, deviceBrand}) => {
    const {cart, user} = useContext(Context);
    const history = useNavigate();
    const [brandName, setBrandName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setIsLoading(true);
                const data = await getOneBrand(deviceBrand);
                setBrandName(data.brandName);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchBrand();
    }, [deviceBrand]);

    useEffect(() => {
        const markDevice = async () => {
            try {
                await putMark(device.id);
            } catch (error) {
                console.error(error);
            }
        };

        markDevice();
    }, [device.id, device.rating, device]);

    const handleAddToCart = async (event) => {
        event.stopPropagation();

        if (!user.user.id) {
            Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Товары могут приобретать только авторизированные пользователи!',
            });
            return;
        }

        try {
            const data = await createCartItem(cart.cartId, +device.id);
            Swal.fire({
                icon: data.message === 'Товар успешно добавлен в корзину!' ? 'success' : 'error',
                title: data.message === 'Товар успешно добавлен в корзину!' ? 'Ваушки!' : 'Внимание!',
                text: data.message,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка!',
                text: 'Произошла ошибка при добавлении товара в корзину.',
            });
        }
    };

    if (isLoading) {
        return <div className="loader">
            <TailSpin
                height="100"
                width="80"
                color="#FFF"
                ariaLabel="tail-spin-loading"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }

    return (
        <div
            className="device"
            onClick={() => history(`${CURRENT_DEVICE_ROUTE}/${device.id}`)}
        >
            <div className="device__image">
                {device.images.map((image, index) => (
                    <img
                        style={{width: '150px', height: '150px'}}
                        src={`${process.env.REACT_APP_API_PATH}${image.imagePath}`}
                        alt={`Device images ${index + 1}`}
                        aria-label={`Device Image ${index + 1}`}
                        key={index}
                    />
                ))}
            </div>
            <div className="device__info">
                {isLoading ? 'Loading...' : `${brandName} ${device.deviceName}`}
            </div>
            <div className="device__rating">
                <div className="device__rating--value">{device.rating}</div>
                <div className="device__rating--stars">
                    <Stars/>
                </div>
            </div>
            <div className="device__buying">
                <div className="device__buying--price">от {device.devicePrice} ₽</div>
                <button
                    className="device__buying--btn btn-reset"
                    onClick={handleAddToCart}
                >
                    <Cart/>
                </button>
            </div>
        </div>
    );
};

export default DeviceItem
import React from 'react';
import {getOneBrand} from "../../../http/deviceApi";
import {useNavigate} from "react-router-dom";
import {CURRENT_DEVICE_ROUTE} from "../../../utils/consts";

import {ReactComponent as Stars} from "../../../assets/svg/device/stars.svg";
import {ReactComponent as Cart} from "../../../assets/svg/device/cart.svg";
import {createCartItem} from "../../../http/cartAPI";
import {Context} from "../../../index";
import Swal from "sweetalert2";

const DeviceItem = ({device, deviceBrand}) => {
    const {cart} = React.useContext(Context)
    const history = useNavigate()
    const [brandName, setBrandName] = React.useState('')
    React.useEffect(() => {
        getOneBrand(deviceBrand).then((data) => {
            setBrandName(data.brandName)
        })
    }, [deviceBrand])

    return (
        <div className="device"
             onClick={() => history(`${CURRENT_DEVICE_ROUTE}/${device.id}`)}>
            <div className="device__image">
                {
                    device.images.map((image, index) => (
                        <img src={`${process.env.REACT_APP_API_PATH}${image.imagePath}`}
                             alt={`Device Image ${index + 1}`}
                             aria-label={`Device Image ${index + 1}`}
                             key={index}/>
                    ))
                }
            </div>
            <div className="device__info">
                {brandName} {device.deviceName}
            </div>
            <div className="device__rating">
                <div className="device__rating--value">
                    {device.rating}
                </div>
                <div className="device__rating--stars">
                    <Stars/>
                </div>
            </div>
            <div className="device__buying">
                <div className="device__buying--price">
                    от {device.devicePrice} ₽
                </div>
                <button className="btn-reset device__buying--btn"
                        onClick={(event) => {
                            createCartItem(cart.cartId,device.id).then((data) => {
                                return Swal.fire({
                                    icon: 'success',
                                    title: 'Ваушки!',
                                    text: data.message
                                })
                            })
                            event.stopPropagation()
                        }}>
                    <Cart />
                </button>
            </div>
        </div>
    );
};

export default DeviceItem;
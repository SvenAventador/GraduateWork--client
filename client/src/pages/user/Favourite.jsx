import React from 'react';
import {Context} from "../../index";
import {ReactComponent as Delete} from "../../assets/svg/cart/delete.svg";
import {NavLink} from "react-router-dom";
import {CURRENT_DEVICE_ROUTE} from "../../utils/consts";


const Favourite = () => {
    const {user} = React.useContext(Context)
    let [devices, setDevices] = React.useState(null)

    React.useEffect(() => {
        setDevices(JSON.parse(localStorage.getItem(`favouriteDevices_${user.user.id}`)) || [])
    }, [user.user.id])

    const deleteFavourite = (id) => {
        const index = devices.findIndex(d => d.id === id);

        if (index >= 0)
            devices.splice(index, 1);

        localStorage.setItem(`favouriteDevices_${user.user.id}`, JSON.stringify(devices));
    }

    return (
        <div className="favourite-container">
            <div className="favourite site-container">
                <div className="favourite__title">Список избранных устройств</div>
                {
                    devices && devices.length > 0 ? (
                            <>
                                {
                                    devices.map((device, index) => (
                                        <div className="favourite-device" key={index}>
                                            <NavLink to={CURRENT_DEVICE_ROUTE + '/' + device.id}
                                                     className="favourite-device__left">
                                                <div className="favourite-device__left--image">
                                                    <img
                                                        src={`${process.env.REACT_APP_API_PATH}/${device.images[0].imagePath}`}
                                                        alt="Device images"
                                                        aria-label="Device Image"/>
                                                </div>
                                                <div className="favourite-device__left--description">
                                                    <div className="favourite-device__left--description-name">
                                                        {device.deviceName}
                                                    </div>
                                                    <div className="favourite-device__left--description-price">
                                                        <span>{device.devicePrice}₽</span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <div className="favourite-device__right">
                                                <button className="btn-reset favourite-device__right--btn"
                                                        onClick={() => {
                                                            deleteFavourite(device.id)
                                                            const updatedFavDevice = devices.filter(devices => devices.id !== device.id);
                                                            setDevices(updatedFavDevice);
                                                        }}>
                                                    <Delete/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        ) :
                        <div className="favourite__empty">
                            Нет избранных устройств!
                        </div>
                }
            </div>
        </div>
    );
};

export default Favourite;
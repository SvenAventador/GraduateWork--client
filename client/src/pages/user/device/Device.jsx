import React from 'react';
import {ReactComponent as hurt} from '../../../assets/svg/device/heart.svg'
import {useParams} from "react-router-dom";
import {getOneDevice} from "../../../http/deviceApi";
import {createCartItem} from "../../../http/cartAPI";
import Swal from "sweetalert2";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import ImageSlider from "./ImageSlider";

const Device = observer(() => {
    const {user} = React.useContext(Context)
    const [device, setDevice] = React.useState({info: [], images: []})
    const {id} = useParams()

    React.useEffect(() => {
        getOneDevice(id).then((data) => {
            setDevice(data)
        })
    }, [id])

    return (
        <div className="device-info">
            <div className="device-info__top">
                <div className="device-info__left">
                    <ImageSlider images={device.images} />
                </div>
                <div className="device-info__right">

                </div>
            </div>
            <div className="device-info__bottom">

            </div>
        </div>
    //     /*<div className={"phone-info"}>
    //         <div className="phone-info__top flex">
    //             <div className="phone-info__top--image">
    //                 <img src={process.env.REACT_APP_API_URL + devices.img}
    //                      alt="device_img"
    //                      aria-label={"devices image"}/>
    //             </div>
    //             <div className="phone-info__about">
    //                 <h3 className={"phone-info__about--name"}>{devices.deviceName}</h3>
    //                 <div className="phone-info__about--star">
    //
    //                     {/*TODO*/}
    //
    //                     <div className="phone-info__additionally">
    //                         <div className="phone-info__additionally--list flex">
    //                             <h3 className="phone-info__additionally--price">
    //                                 {devices.devicePrice + " руб"}
    //                             </h3>
    //                             <img src={hurt}
    //                                  alt="Favourite"
    //                                  aria-label={"Favourite button"}
    //                                  className={'phone-info__additionally--favourite'}/>
    //                             <button className="phone-info__additionally--buy btn-reset"
    //                                     onClick={() => {
    //                                         createCartItem(user.user.id, parseInt(id)).then(data => {
    //                                             return Swal.fire({
    //                                                 icon: 'success',
    //                                                 title: 'Ваушки!',
    //                                                 text: data.message
    //                                             })
    //                                         })
    //                                     }}>
    //                                 Добавить в корзину
    //                             </button>
    //                         </div>
    //                         <div className="phone-info__additionally--descr">
    //                             {devices.descriptionDevice}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="phone-info__bottom">
    //             <h2 className="phone-info__bottom--title">Общие хакартеристики</h2>
    //             {
    //                 devices.info.map(info =>
    //                     <div className={"phone-info__bottom--data flex"} key={info.id}>
    //                         <div className={"phone-info__bottom--data-title"}>{info.titleInfo}</div>
    //                         <div className={"phone-info__bottom--data-descr"}>{info.descriptionInfo}</div>
    //                     </div>
    //                 )
    //             }
    //         </div>
    //     </div>*/
    // );/*
    )});

export default Device;
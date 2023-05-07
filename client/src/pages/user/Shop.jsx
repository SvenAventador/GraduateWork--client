import React from 'react';
import BrandList from "../../components/devices/sorting/BrandList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getAllBrands, getAllColors, getAllDevices, getAllMaterials, getAllWireless} from "../../http/deviceApi";
import ColorList from "../../components/devices/sorting/ColorList.jsc";
import MaterialList from "../../components/devices/sorting/MaterialList";
import WirelessList from "../../components/devices/sorting/WirelessList";
import DeviceList from "../../components/devices/device/DeviceList";
import {getCartId} from "../../http/cartAPI";
import DeviceCount from "../../components/devices/device/DeviceCount";

const Shop = observer(() => {
    const {device, user, cart} = React.useContext(Context)

    React.useEffect(() => {
        getAllBrands().then(data => device.setBrand(data))
        getAllColors().then(data => device.setColor(data))
        getAllMaterials().then(data => device.setMaterial(data))
        getAllWireless().then(data => device.setWireless(data))
        getAllDevices(
            device.selectedTypes.id,
            null,
            null,
            null,
            null,
            3,
            1,
            null,
            null,
            null).then(data => {
            device.setDevice(data.rows);
            device.setTotalCount(data.count);
        });
        console.log(device.selectedTypes)
    }, [device, device.selectedTypes])

    React.useEffect(() => {
        if (user.isAuth) {
            getCartId(user.user.id).then(cartId => {
                cart.setCartId(cartId)
            })
        }
    }, [user.isAuth, user.user.id, cart])

    React.useEffect(() => {
        getAllDevices(
            device.selectedTypes.id,
            device.selectedBrand?.id,
            device.selectedColors?.id,
            device.selectedMaterials?.id,
            device.selectedWireless?.id,
            3,
            device.page,
            null,
            null,
            null
        ).then((data) => {
            device.setDevice(data.rows);
            device.setTotalCount(data.count);
        })
    }, [
        device,
        device.page,
        device.selectedTypes,
        device.selectedBrand,
        device.selectedColors,
        device.selectedMaterials,
        device.selectedWireless,
        device.selectedRating,
        device.selectedMinPrice,
        device.selectedMaxPrice
    ])

    return (
        <div className="shop site-container">
            <div className="shop__left">
                <div className="shop__left--btn">
                    <button className="shop__left--btn-clear"
                            onClick={React.useCallback(() => {
                                device.setSelectedBrands({})
                                device.setSelectedColors({})
                                device.setSelectedMaterials({})
                                device.setSelectedWireless({})
                                device.setSelectedRating(null)
                                device.setSelectedMinPrice(null)
                                device.setSelectedMaxPrice(null)
                            }, [device])}>
                        Очистить фильтры
                    </button>
                </div>
                <BrandList/>
                <ColorList/>
                <MaterialList/>
                <WirelessList/>
            </div>
            <div className="shop__right">
                <div className="shop__right--top">
                    <DeviceList/>
                </div>
                <div className="shop__right--bottom">
                    <DeviceCount />
                </div>
            </div>
        </div>
    );
});

export default Shop;
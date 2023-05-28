import React from 'react';
import BrandList from "../../components/devices/sorting/BrandList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getAllBrands, getAllColors, getAllDevices, getAllMaterials, getAllWireless} from "../../http/deviceApi";
import ColorList from "../../components/devices/sorting/ColorList.jsc";
import MaterialList from "../../components/devices/sorting/MaterialList";
import WirelessList from "../../components/devices/sorting/WirelessList";
import DeviceList from "../../components/devices/device/DeviceList";
import {getCartId} from "../../http/cartApi";
import DeviceCount from "../../components/devices/device/DeviceCount";
import RatingList from "../../components/devices/sorting/RatingList";
import PriceList from "../../components/devices/sorting/PriceList";

const Shop = observer(() => {
    const {device, user, cart} = React.useContext(Context)
    const [minPrice, setMinPrice] = React.useState(null)
    const [maxPrice, setMaxPrice] = React.useState(null)
    
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
            9,
            1,
            null,
            null,
            null).then((data) => {
            device.setDevice(data.devices.rows);
            device.setMinPrice(data.minPrice)
            device.setMaxPrice(data.maxPrice)
            device.setTotalCount(data.devices.count);
            setMaxPrice(device.maxPrice)
            setMinPrice(device.minPrice)
        });
    }, [device, device.selectedTypes, device.rating])

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
            9,
            device.page,
            device.minPrice,
            device.maxPrice,
            device.selectedRating?.value
        ).then((data) => {
            device.setDevice(data.devices.rows);
            device.setTotalCount(data.devices.count);
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
        device.maxPrice,
        device.minPrice,
        device.rating
    ])
    console.log(device)
    return (
        <div className="shop site-container">
            <div className="shop__left">
                <div className="shop__left--btn">
                    <button className="shop__left--btn-clear"
                            onClick={React.useCallback(() => {
                                device.setSelectedTypes({})
                                device.setSelectedBrands({})
                                device.setSelectedColors({})
                                device.setSelectedMaterials({})
                                device.setSelectedWireless({})
                                device.setSelectedRating(null)
                                device.setMinPrice(minPrice)
                                device.setMaxPrice(maxPrice)
                            }, [device, maxPrice, minPrice])}>
                        Очистить фильтры
                    </button>
                </div>
                {device.minPrice && device.maxPrice && (
                    <PriceList minPrice={device.minPrice}
                               maxPrice={device.maxPrice}/>
                )}
                <BrandList/>
                <RatingList/>
                <ColorList/>
                <MaterialList/>
                <WirelessList/>
            </div>
            <div className="shop__right">
                <div className="shop__right--top">
                    <DeviceList/>
                </div>
                <div className="shop__right--bottom">
                    <DeviceCount/>
                </div>
            </div>
        </div>
    );
});

export default Shop;
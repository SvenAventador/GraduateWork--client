import React from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = React.useContext(Context)
    return (
        <div className="device__list">
            {device.totalCount > 0 ? (
                device.devices.map((device) => (
                    <DeviceItem key={device.id} device={device} deviceBrand={device.brandId} />
                ))
            ) : (
                <p className="device__list--not-found">
                    По вашему запросу товар(-ы) не найдены!
                </p>
            )}
        </div>

    );
});

export default DeviceList;
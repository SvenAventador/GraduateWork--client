import React from "react";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const WirelessList = observer(() => {
    const { device } = React.useContext(Context);

    const selectedWirelessId = device.selectedWireless ? device.selectedWireless.id : null;
    const [visibleWirelessCount, setVisibleWirelessCount] = React.useState(4);

    const handleWirelessClick = (id) => {
        if (selectedWirelessId === null || selectedWirelessId !== id) {
            device.setSelectedWireless(
                device.wireless.find((wireless) => wireless.id === id)
            );
        } else {
            device.setSelectedWireless({});
        }
    };

    const handleShowMoreClick = () => {
        setVisibleWirelessCount((prevState) => prevState + 3);
    };

    return (
        <div className="sorting">
            <h3 className="sorting__title">Список беспроводных устройств</h3>
            <ul className="sorting__list">
                {device.wireless.slice(0, visibleWirelessCount).map((wireless) => (
                    <li className={`sorting__item ${selectedWirelessId === wireless.id ? "sorting__item--active" : ""}`}
                        onClick={() => handleWirelessClick(wireless.id)}
                        key={wireless.id}>
                            {wireless.typeName}
                    </li>
                ))}
            </ul>
            {visibleWirelessCount < device.wireless.length && (
                <div className="sorting__btn">
                    <button className="sorting__btn--show"
                            onClick={handleShowMoreClick}>
                        Показать еще
                    </button>
                </div>
            )}
        </div>
    );
});

export default WirelessList;

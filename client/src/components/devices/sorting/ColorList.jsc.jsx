import React from "react";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const ColorList = observer(() => {
    const { device } = React.useContext(Context);

    const selectedColorId = device.selectedColors ? device.selectedColors.id : null;
    const [visibleColorCount, setVisibleColorCount] = React.useState(4);

    const handleColorClick = (id) => {
        if (selectedColorId === null || selectedColorId !== id) {
            device.setSelectedColors(
                device.color.find((color) => color.id === id)
            );
        } else {
            device.setSelectedColors({});
        }
    };

    const handleShowMoreClick = () => {
        setVisibleColorCount((prevState) => prevState + 3);
    };

    return (
        <div className="sorting">
            <h3 className="sorting__title">Список цветов устройств</h3>
            <ul className="sorting__list">
                {device.color.slice(0, visibleColorCount).map((color) => (
                    <li className={`sorting__item ${selectedColorId === color.id ? "sorting__item--active" : ""}`}
                        onClick={() => handleColorClick(color.id)}
                        key={color.id}>
                        <div style={{width: 30 + 'px',
                                     height: 30 + 'px',
                                     backgroundColor: color.hexValue,
                                     borderRadius: 50 + '%',
                                     marginRight: 1 + 'rem'}} />
                        <div className="sorting__item--value">{color.colorName}</div>
                    </li>
                ))}
            </ul>
            {visibleColorCount < device.color.length && (
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

export default ColorList;

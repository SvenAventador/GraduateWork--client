import React from "react";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const MaterialList = observer(() => {
    const { device } = React.useContext(Context);

    const selectedMaterialId = device.selectedMaterials ? device.selectedMaterials.id : null;
    const [visibleMaterialCount, setVisibleMaterialCount] = React.useState(4);

    const handleMaterialClick = (id) => {
        if (selectedMaterialId === null || selectedMaterialId !== id) {
            device.setSelectedMaterials(
                device.material.find((material) => material.id === id)
            );
        } else {
            device.setSelectedMaterials({});
        }
    };

    const handleShowMoreClick = () => {
        setVisibleMaterialCount((prevState) => prevState + 3);
    };

    return (
        <div className="sorting">
            <h3 className="sorting__title">Список материала корпусов</h3>
            <ul className="sorting__list">
                {device.material.slice(0, visibleMaterialCount).map((material) => (
                    <li
                        className={`sorting__item ${selectedMaterialId === material.id ? "sorting__item--active" : ""}`}
                        onClick={() => handleMaterialClick(material.id)}
                        key={material.id}>
                        {material.materialName}
                    </li>
                ))}
            </ul>
            {visibleMaterialCount < device.material.length && (
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

export default MaterialList;

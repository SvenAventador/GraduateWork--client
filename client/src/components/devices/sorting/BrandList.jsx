import React from "react";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const BrandList = observer(() => {
    const { device } = React.useContext(Context);

    const selectedBrandId = device.selectedBrand ? device.selectedBrand.id : null;
    const [visibleBrandsCount, setVisibleBrandsCount] = React.useState(4);

    const handleBrandClick = (id) => {
        if (selectedBrandId === null || selectedBrandId !== id) {
            device.setSelectedBrands(
                device.brand.find((brand) => brand.id === id)
            );
        } else {
            device.setSelectedBrands({});
        }
    };

    const handleShowMoreClick = () => {
        setVisibleBrandsCount((prevState) => prevState + 3);
    };

    return (
        <div className="sorting">
            <h3 className="sorting__title">Список брендов</h3>
            <ul className="sorting__list">
                {device.brand.slice(0, visibleBrandsCount).map((brand) => (
                    <li
                        className={`sorting__item ${selectedBrandId === brand.id ? "sorting__item--active" : ""}`}
                        onClick={() => handleBrandClick(brand.id)}
                        key={brand.id}>
                        {brand.brandName}
                    </li>
                ))}
            </ul>
            {visibleBrandsCount < device.brand.length && (
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

export default BrandList;

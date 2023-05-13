import React from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {StarFilled} from "@ant-design/icons";

const RatingList = observer(() => {
    const { device } = React.useContext(Context);

    const selectedRatingId = device.selectedRating ? device.selectedRating.id : null;

    const handleRatingClick = (id) => {
        if (selectedRatingId === null || selectedRatingId !== id) {
            device.setSelectedRating(
                device.rating.find((rating) => rating.id === id)
            );
        } else {
            device.setSelectedRating({});
        }
    };

    return (
        <div>
            <div className="sorting">
                <h3 className="sorting__title">Рейтинги устройств</h3>
                <ul className="sorting__list">
                    {device.rating.map((rating) => (
                        <li className={`sorting__item ${selectedRatingId === rating.id ? "sorting__item--active" : ""}`}
                            onClick={() => handleRatingClick(rating.id)}
                            key={rating.id}>
                            <div>{rating.value}</div>
                            <div className="sorting__item--value">{<StarFilled style={{fontSize: '30px', color: 'yellow', marginLeft: '.5rem'}}/>}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

export default RatingList;
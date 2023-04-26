import React from 'react';
import AdvantagesItem from "./AdvantagesItem";

const AdvantagesList = ({items}) => {

    const [isActiveItem, setIsActiveItem] = React.useState(null)

    const toggleActive = (item) => {
        setIsActiveItem((prevState) => {
            return prevState === item ? null
                                      : item
        })
    }

    return (
        <ul className={"advantages__list"}>
            {
                items.map((item, index) =>
                    <AdvantagesItem key={index}
                                    item={item}
                                    isActive={isActiveItem === item}
                                    onFocus={() => toggleActive(item)} />
                )
            }
        </ul>
    );
};

export default AdvantagesList;
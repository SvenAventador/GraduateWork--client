import React from 'react';

const AdvantagesItem = ({item, isActive, onFocus}) => {

    const descriptionBlock = React.useRef(null)

    React.useEffect(() => {
        isActive ? descriptionBlock.current.style.display = 'block'
            : descriptionBlock.current.style.display = 'none'
    }, [isActive])

    return (
        <li className={`advantages__item ${isActive ? "advantages__item--active" : ''}`}
            onMouseEnter={() => onFocus()}
            onMouseLeave={() => onFocus()}>
            <div className="advantages__item-top">
                {item.image}
                <p className="advantages__item-top--title">
                    {item.title}
                </p>
            </div>
            <div className="advantages__item-bottom">
                <p className="advantages__item-bottom-description"
                   ref={descriptionBlock}>
                    {item.description}
                </p>
            </div>
        </li>
    );
};

export default AdvantagesItem;
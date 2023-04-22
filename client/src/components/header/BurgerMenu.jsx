import React from 'react';

const BurgerMenu = () => {
    const [isActive, setIsActive] = React.useState(false)

    /**
     * Смена состояния.
     */
    const toggleMenu = () => {
        setIsActive(!isActive)
    }

    return (
        <div className={`burger-bottom__catalog ${isActive ? "burger-bottom__catalog--open" : ""}`}>
            <div className="burger-bottom__catalog--btn"
                 onClick={toggleMenu}>
                <span className="burger-bottom__catalog--icon">
                    <span className="burger-bottom__catalog--line"></span>
                    <span className="burger-bottom__catalog--line"></span>
                    <span className="burger-bottom__catalog--line"></span>
                </span>
                <p className="burger-bottom__catalog--text">Каталог</p>
            </div>

            <ul className="burger-bottom__catalog__list">
                <li className="burger-menu__item">Item 1</li>
                <li className="burger-menu__item">Item 2</li>
                <li className="burger-menu__item">Item 3</li>
                <li className="burger-menu__item">Item 4</li>
                <li className="burger-menu__item">Item 5</li>
                <li className="burger-menu__item">Item 6</li>
                <li className="burger-menu__item">Item 7</li>
            </ul>
        </div>
    );
};

export default BurgerMenu;
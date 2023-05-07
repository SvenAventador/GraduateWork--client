import React from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getAllTypes} from "../../http/deviceApi";
import {useNavigate} from "react-router-dom";
import {DEVICES_ROUTE} from "../../utils/consts";

const BurgerMenu = observer(() => {
    const [isActive, setIsActive] = React.useState(false)
    const burgerRef = React.useRef(null)

    const toggleMenu = () => {
        setIsActive(!isActive)
    }
    
    const selectNewType = (type) => {
        device.setSelectedTypes(type)
        history(DEVICES_ROUTE)
        setIsActive(false)
    }

    React.useEffect(() => {
        const clickOutside = (event) => {
            if (burgerRef.current && !burgerRef.current.contains(event.target))
                setIsActive(false)
        }

        document.addEventListener('mousedown', clickOutside)

        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }
    }, [burgerRef])

    const {device} = React.useContext(Context);

    React.useEffect(() => {
        getAllTypes().then(data => device.setType(data))
    }, [device]);

    const history = useNavigate()

    return (
        <div className={`burger-bottom__catalog ${isActive ? "burger-bottom__catalog--open" : ""}`}
             ref={burgerRef}>
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
                {device.type.map((type) => (
                    <li className="burger-bottom__catalog__item"
                        onClick={() => selectNewType(type)}
                        key={type.id}>
                        {type.typeName}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default BurgerMenu;
import React from 'react';

import {ReactComponent as Search} from "../../assets/svg/header/search.svg";
import {ReactComponent as ClearForm} from "../../assets/svg/header/clear.svg";

const SearchForm = () => {
    const [inputValue, setInputValue] = React.useState('')

    const [isActive, setIsActive] = React.useState(false)
    const inputRef = React.useRef(null)

    React.useEffect(() => {

        const clickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target))
                setIsActive(false)
            }

            document.addEventListener('mousedown', clickOutside)

            return () => {
                document.removeEventListener('mousedown', clickOutside)
        }
    }, [inputRef])

    const inputChange = (event) => {
        setInputValue(event.target.value)
    }

    const setEmptyValue = () => {
        if (inputValue.trim() !== '')
            setInputValue('')
    }

    return (

        <div className={`header-bottom__search 
                        ${inputValue.trim() !== '' ? "header-bottom__search--active" : ""}
                        ${isActive ? "header-bottom__search--focus" : ""}`}>
            <input className={"header-bottom__search--string"}
                   type="text"
                   value={inputValue}
                   onFocus={() => setIsActive(true)}
                   onBlur={() => setIsActive(false)}
                   ref={inputRef}
                   onChange={inputChange}
                   placeholder="Поиск среди тысячи товаров..."/>

            <button className={"header-bottom__search--btn btn-reset"}
                    type="submit"
                    onClick={() => setEmptyValue()}
                    aria-label={"Кнопка поиска"}>
                <ClearForm className={"header-bottom__search--btn-reset"}
                           aria-label={"Кнопка очистки формы поиска"}/>
            </button>

            <button className={"header-bottom__search--btn btn-reset"}
                    aria-label={"Кнопка поиска"}>
                <Search className={"header-bottom__search--btn-search"}
                        aria-label={"Кнопка поиска товаров"} />
            </button>
        </div>

    );
};

export default SearchForm;
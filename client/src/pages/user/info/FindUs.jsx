import React from 'react';
import {NavLink} from "react-router-dom";

const FindUs = () => {
    return (
        <div className="find site-container">
            <p>Внимание! При самовывозе необходимо заранее оформить заказ.</p>
            <p>Забрать заказанный товар вы&nbsp;можете в&nbsp;шоуруме Биг Гик в&nbsp;Москве, расположенном
                по&nbsp;адресу:</p>
            <p>
                <NavLink
                    to={"https://yandex.ru/maps/org/kazanskiy_natsionalny_issledovatelskiy_tekhnicheskiy_universitet_im_a_n_tupoleva_kai_priyemnaya_komissiya/1708272014/?ll=49.134583%2C55.804027&mode=search&sll=49.134583%2C55.804004&text=7%20%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D0%B8&z=12"}>
                    <b>Казань, Большая Красная, д.&nbsp;55&nbsp;к.&nbsp;204</b>
                </NavLink>
            </p>
            <p>
                Ближайшие станции метро&nbsp;&mdash; <b>Кремлевская</b> или <b>Тукая</b>
            </p>
            <p>
                Пешая прогулка до&nbsp;нас составит в&nbsp;среднем 15&nbsp;минут.
            </p>
            <p>
                График работы шоурума&nbsp;&mdash; <b>ежедневно с&nbsp;11:00 до&nbsp;20:00</b>
            </p>
            <p>
                Для оформления разового пропуска нужно обратиться к&nbsp;охране и&nbsp;назвать номер офиса (204) или
                название компании (ТехноВорлд). Для оформления пропуска требуется документ, удостоверяющий личность.
            </p>
            <div className="contacts__yandex">
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A42aad5918d20be5a90d41ac44339f66cc54fdbe1da01cd7f24dac4b6c55d4092&amp;source=constructor"
                    width="100%" height="700" frameBorder="0"></iframe>
            </div>
        </div>
    );
};

export default FindUs;
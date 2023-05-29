import React from 'react';
import {NavLink} from "react-router-dom";

const Contacts = () => {
    return (
        <div className="contacts site-container">
            <h1>Контакты</h1>
            <p>
                Друзья, мы&nbsp;работаем для вас ежедневно с&nbsp;10:00 до&nbsp;20:00.
            </p>
            <p>
                В&nbsp;субботу, воскресенье, и&nbsp;в&nbsp;праздничные дни с&nbsp;10:00 до&nbsp;20:00.
            </p>
            <p>
                График работы пункта самовывоза (шоурума): Ежедневно&nbsp;11:00 до&nbsp;20:00.
            </p>
            <p>
                <b>Внимание:</b> при самовывозе необходимо заранее оформить заказ. Не&nbsp;забудьте связаться
                с&nbsp;нами перед приездом.
            </p>
            <p>
                Вы&nbsp;всегда сможете получить техническую поддержку и&nbsp;консультацию по&nbsp;ассортименту наших
                товаров следующими способами:
            </p>
            <ul>
                <li>Cделав заказ на&nbsp;нашем сайте в&nbsp;любой день недели и&nbsp;в&nbsp;любое время суток</li>
                <li>
                    <span>По&nbsp;многоканальным телефонам в&nbsp;Казани:</span>
                    <ol>
                        <li>
                            <NavLink to={"tel:+79999999999"}>
                                +7 (999) 999-99-99
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"tel:+79999999999"}>
                                +7 (999) 999-99-99
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"tel:+79999999999"}>
                                +7 (999) 999-99-99
                            </NavLink>
                            (Не дозвонились? Дополнительный телефон для связи:
                            <NavLink to={"tel:+79999999999"}>
                                +7 (999) 999-99-99
                            </NavLink>
                            )
                        </li>
                    </ol>
                </li>
                <li>
                    Вы&nbsp;также можете связаться с&nbsp;нами с&nbsp;помощью мессенджеров:
                    <NavLink to={process.env.REACT_APP_WA_LINK}>WhatsApp</NavLink> /
                    <NavLink to={process.env.REACT_APP_TG_LINK}> Telegram</NavLink>
                </li>
                <li>
                    <span>В&nbsp;наших профилях в&nbsp;социальных сетях:</span>
                    <ol>
                        <li>
                            <NavLink to={process.env.REACT_APP_TG_LINK}>TechnoWorld Телеграм</NavLink>
                        </li>
                        <li>
                            <NavLink to={"https://vk.com/sanya198olegovich"}>TechnoWorld Вконтакте</NavLink>
                        </li>
                    </ol>
                </li>
                <li>
                    <span>
                        Также вы&nbsp;можете связаться с&nbsp;нами по&nbsp;различным вопросам по&nbsp;email:
                    </span>
                    <ol>
                        <li>
                            <NavLink
                                to={"mailto:info@technoworld.ru"}>info@technoworld.ru</NavLink>&nbsp;&mdash; по&nbsp;общим
                            вопросам и&nbsp;для получения консультации по&nbsp;ассортименту наших товаров
                        </li>
                        <li>
                            <NavLink to={"mailto:pr@technoworld.ru"}>pr@technoworld.ru</NavLink>&nbsp;&mdash; для
                            блогеров и&nbsp;предложений по&nbsp;сотрудничеству
                        </li>
                        <li>
                            <NavLink
                                to={"mailto:ad@technoworld.ru"}>ad@technoworld.ru</NavLink>&nbsp;&mdash; по&nbsp;вопросам
                            размещения рекламы на&nbsp;наших ресурсах
                            (YouTube, VK, Telegram, Twitter, другие соцсети, блог)
                        </li>
                        <li>
                            <NavLink to={"mailto:buy@technoworld.ru"}>buy@technoworld.ru</NavLink>&nbsp;&mdash; если
                            у&nbsp;вас есть интересные предложения по&nbsp;закупке
                            и&nbsp;продаже товаров
                        </li>
                    </ol>
                </li>
            </ul>
            <p>
                Мы&nbsp;дорожим своей репутацией, поэтому если вдруг вы&nbsp;остались недовольны нашей работой,
                пожалуйста, позвоните по&nbsp;телефону&nbsp;+7 (999) 999-99-99 и&nbsp;расскажите
                о&nbsp;проблеме&nbsp;&mdash; мы&nbsp;решим ее&nbsp;максимально быстро.
            </p>
            <p>
                Забрать заказанный товар вы&nbsp;можете в&nbsp;шоуруме КНИТУ-КАИ в&nbsp;Казани, расположенном
                по&nbsp;адресу:
            </p>
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

export default Contacts;
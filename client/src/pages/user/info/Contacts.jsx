import React from 'react';

const Contacts = () => {
    return (
        <section className="page">
            <div className="page_container body_container container">
                <h1>Контакты</h1>
                <br />
                <p>
                    Друзья, мы работаем для вас ежедневно с 10:00 до 20:00.
                    <br />
                    в субботу, воскресенье, и в праздничные дни с 10:00 до 20:00.
                    <br />
                    График работы пункта самовывоза (шоурума): Ежедневно 11:00 до 20:00.
                    <br />
                </p>
                <p>
                    <b>Внимание:</b> при самовывозе необходимо заранее оформить заказ. Не забудьте связаться с нами перед приездом.
                </p>
                <br />
                <p>Вы всегда сможете получить техническую поддержку и консультацию по ассортименту наших товаров следующими способами:</p>
                <br />
                <ul style={{ fontSize: "18px !important", listStyleType: "square" }}>
                    <li>Сделав заказ на нашем сайте в любой день недели и в любое время суток</li>
                    <br />
                    <li>По многоканальным телефонам в Москве:</li>
                    <br />
                    <ul style={{ fontSize: "18px !important", listStyleType: "none", lineHeight: 2 }}>
                        <li>
                            <a href="tel:+74997033667">
                                <span style={{ textDecorationLine: "underline", color: "#085294" }}>8 (499) 703-36-67</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+74959434943">
                                <span style={{ textDecorationLine: "underline", color: "#085294" }}>8 (495) 943-49-43</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+74951804130">
                                <span style={{ textDecorationLine: "underline", color: "#085294" }}>8 (495) 180-41-30</span>
                            </a>{" "}
                            (Не дозвонились? Дополнительный телефон для связи: 8 (916) 034-80-34)
                        </li>
                    </ul>
                    <br />
                    <li>
                        Вы также можете связаться с нами с помощью мессенджеров:{" "}
                        <a href="https://api.whatsapp.com/send?phone=79160348034" target="_blank" rel="noopener">
                            <span style={{ color: "#085294" }}>WhatsApp</span>
                        </a>
                        ,{" "}
                        <a href="https://t.me/BigGeekHelp_bot" target="_blank" rel="noopener">
                            <span style={{ color: "#085294" }}>Telegram</span>
                        </a>
                    </li>
                    <br />
                    <li>
                        При помощи online-консультанта на нашем сайте. Просто нажмите на кнопку "Нужна помощь?" в нижнем правом углу экрана
                    </li>
                    <br />
                    <li>В наших профилях в социальных сетях:</li>
                    <br />
                    <ul style={{ fontSize: "18px !important", listStyleType: "none", lineHeight: 2 }}>
                        <li>
                            <a href="http://vk.com/biggeekru" target="_blank" rel="noopener">
                                <span style={{ color: "#085294", textDecorationLine: "underline" }}>BIG GEEK Вконтакте</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://t.me/biggeek" target="_blank" rel="noopener">
                                <span style={{ color: "#085294", textDecorationLine: "underline" }}>BIG GEEK Телеграм</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://twitter.com/biggeekru" target="_blank" rel="noopener">
                                <span style={{ color: "#085294", textDecorationLine: "underline" }}>BIG GEEK Твиттер</span>
                            </a>
                        </li>
                    </ul>
                    <br />
                    <li>Также вы можете связаться с нами по различным вопросам по email:</li>
                    <br />
                    <ul style={{ fontSize: "18px !important", listStyleType: "none", lineHeight: 2 }}>
                        <li>
                            <a href="mailto:info@biggeek.ru">
                                <span style={{ textDecorationLine: "underline", color: "#085294" }}>info@biggeek.ru</span>
                            </a>{" "}
                            – по общим вопросам и для получения консультации по ассортименту наших товаров
                        </li>
                        <li>
                            <a href="mailto:pr@biggeek.ru">
                                <span style={{ textDecorationLine: "underline", color: "#085294" }}>pr@biggeek.ru</span>
                            </a>{" "}
                            – для блогеров и предложений по сотрудничеству
                        </li>
                        <li>
                            <a href="mailto:ad@biggeek.ru">
                                <span style={{ textDecorationLine: "underline", color: "#085294" }}>ad@biggeek.ru</span>
                            </a>{" "}
                            – по вопросам размещения рекламы на наших ресурсах (YouTube, VK, Telegram, Twitter, другие соцсети, блог)
                        </li>
                        <li>
                            <a href="mailto:buy@biggeek.ru">
                                <span style={{ textDecorationLine: "underline", color: "#085294" }}>buy@biggeek.ru</span>
                            </a>{" "}
                            – если у вас есть интересные предложения по закупке и продаже товаров
                        </li>
                    </ul>
                </ul>
                <br />
                <p>
                    Мы дорожим своей репутацией, поэтому если вдруг вы остались недовольны нашей работой, пожалуйста, позвоните по
                    телефону 8 (916) 034-80-34 и расскажите о проблеме - мы решим ее максимально быстро.
                </p>
                <br />
                <p>Забрать заказанный товар вы можете в шоуруме Биг Гик в Москве, расположенном по адресу:</p>
                <p>
                    <a href="https://yandex.ru/maps/-/CCUBuYrVWD" target="_blank" rel="noopener">
                        <b>
                            <u style={{ color: "#085294" }}>Москва, Багратионовский проезд, д. 7 к. 20В БЦ "Конвент", этаж 7, офис 711</u>
                        </b>
                    </a>
                </p>
                <p>Ближайшие станции метро - <b>Багратионовская</b> или <b>Фили</b>{" "}
                    <a href="https://yandex.ru/maps/-/CCUBuYrVWD" target="_blank" rel="noopener">
                        <b><i><br /></i></b>
                    </a>
                </p>
                <p>Пешая прогулка до нас составит в среднем 5 минут.</p>
                <p>График работы шоурума - <b> ежедневно с 11:00 до 20:00</b></p>
                <p>
                    Для оформления разового пропуска нужно обратиться к охране и назвать номер офиса (711) или название компании (Биг
                    Гик). Для оформления пропуска требуется документ, удостоверяющий личность.
                </p>
                <br />
                <div>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A4c169cb0bc651100c044b526066d1808864fa651584a8aea251f3c28acbfa19e&amp;source=constructor"
                        width="100%" height="350" frameBorder="0"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contacts;
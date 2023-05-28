import React from 'react';
import {NavLink} from "react-router-dom";

const FindUs = () => {
    return (
        <section className="site-container">
            <div style={{marginTop: '1rem'}}>
                <p style={{lineHeight: '1.5'}}>
                    Внимание! При самовывозе необходимо заранее оформить заказ. Не забудьте связаться с нами перед
                    приездом.
                </p>

                <p style={{lineHeight: '1.5'}}>
                    Забрать заказанный товар вы можете в шоуруме TechnoWorld в Казани,
                    расположенном по адресу:
                </p>
                <p style={{lineHeight: '1.5'}}>
                    <NavLink to={'https://yandex.ru/maps/43/kazan/house/bolshaya_krasnaya_ulitsa_55/YEAYdwRjQUAPQFtvfXt4d3VnYw==/?ll=49.133857%2C55.796947&z=16'}
                             target="_blank"
                             rel="noopener noreferrer">
                        <b><i><u style={{color: '#085294'}}>Казань, Большая Красная, д. 55 к. 204 <br/></u></i></b>
                    </NavLink>
                </p>

                <p style={{lineHeight: '1.5'}}>
                    Ближайшие станции метро -
                    <b>Габдуллы Тукая</b> или&nbsp;
                    <b>Кремлевская</b>
                    <NavLink to={'https://yandex.ru/maps/43/kazan/house/bolshaya_krasnaya_ulitsa_55/YEAYdwRjQUAPQFtvfXt4d3VnYw==/?ll=49.133857%2C55.796947&z=16'}
                             target="_blank"
                             rel="noopener noreferrer">
                        <b><i><br/></i></b>
                    </NavLink>
                </p>
                <p>Пешая прогулка до нас составит в среднем 20 минут.</p>
                <p>График работы здания - <b>Понедельник - Суббота с 7:00 до 20:00</b></p>
                <p>Для оформления разового пропуска нужно обратиться к охране и назвать номер кабинета</p>
                <p><br/><br/></p>
                <div style={{width: '100%', height: '700px'}}>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab8de29f798c47abb19e565590b3b65ea7060937386c4fddbe97f5e61cae38022&amp;source=constructor"
                        width="100%" height="100%" frameBorder="0"></iframe>
                </div>

            </div>
        </section>
    );
};

export default FindUs;
import React from 'react';
import {NavLink} from "react-router-dom";

import {ReactComponent as YouTube} from "../../assets/svg/socials/youtube.svg";
import {ReactComponent as Telegram} from "../../assets/svg/socials/tg.svg";
import {ReactComponent as Vk} from "../../assets/svg/socials/vk.svg";

const Socials = () => {
    return (
        <div className="socials site-container">
            <p className="socials__title">
                Подписывайтесь, и не останетесь без бонусов
            </p>

            <div className="socials__list">
                <NavLink to={""/*TODO доделать ссылки*/}
                         className="socials__item">
                    <div className="socials__item-img">
                        <YouTube />
                    </div>
                    <div className="socials__item-link">
                        <h3 className="socials__item-link--title">
                            YouTube
                        </h3>
                        <address className="socials__item-link--site">
                            @technoworldru
                        </address>
                    </div>
                </NavLink>
                <NavLink to={""/*TODO доделать ссылки*/}
                         className="socials__item">
                    <div className="socials__item-img">
                        <Vk />
                    </div>
                    <div className="socials__item-link">
                        <h3 className="socials__item-link--title">
                            Vkontakte
                        </h3>
                        <address className="socials__item-link--site">
                            @technoworldru
                        </address>
                    </div>
                </NavLink>
                <NavLink to={""/*TODO доделать ссылки*/}
                         className="socials__item">
                    <div className="socials__item-img">
                        <Telegram />
                    </div>
                    <div className="socials__item-link">
                        <h3 className="socials__item-link--title">
                            Telegram
                        </h3>
                        <address className="socials__item-link--site">
                            @technoworldru
                        </address>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Socials;
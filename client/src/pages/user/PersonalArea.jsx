import React from 'react';
import {useParams} from "react-router-dom";
import {getAllOrder} from "../../http/orderApi";
import OrderTable from "../../components/personal/OrderTable";
import UserData from "../../components/personal/UserData";
import {observer} from "mobx-react-lite";

const PersonalArea = observer(() => {
    const {id} = useParams()
    const [clientOrder, setClientOrder] = React.useState([])

    React.useEffect(() => {
        getAllOrder(id)
            .then((response) => {
                const data = response.orders;
                setClientOrder(data);
            })
            .catch((error) => {
                console.log('Ошибка при получении заказов:', error);
            });
    }, [id]);

    return (
        <div className="personal-container">
            <div className="personal site-container">
                <div className="personal__title">Личный кабинет</div>
                <div className="personal__component">
                    <div className="personal__left">
                        {
                            clientOrder ? (<OrderTable orders={clientOrder}/>) :
                                <div className={"personal__left--empty"}>У вас нет заказов!</div>
                        }
                    </div>
                    <div className="personal__right">
                        <UserData/>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PersonalArea;
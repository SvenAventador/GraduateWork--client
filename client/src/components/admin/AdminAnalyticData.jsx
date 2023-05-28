import React from 'react';
import {getClient, getCountBrand, getCountType, getFullPrice, getRatingDevice} from "../../http/adminApi";
import {getAllDevices} from "../../http/deviceApi";
import Histogram from "./composition/Histogram";

const AdminAnalyticData = ({theme}) => {

    const [brand, setBrand] = React.useState(null)
    const [type, setType] = React.useState(null)
    const [device, setDevice] = React.useState(null)
    const [client, setClient] = React.useState(null)
    const [overPrice, setOverPrice] = React.useState(null)
    const [rating, setRating] = React.useState([])

    React.useEffect(() => {
        getCountBrand().then((data) => {
            setBrand(data.count)
        })
        getCountType().then((data) => {
            setType(data.count)
        })
        getAllDevices(
            null,
            null,
            null,
            null,
            null,
            null, null,
            null,
            null,
            null).then((data) => {
            setDevice(data.devices.count)
        })
        getClient().then((data) => {
            console.log(data)
            setClient(data.usersWithOrders.count)
        })
        getFullPrice().then((data) => {
            setOverPrice(data)
        })
        getRatingDevice().then((data) => {
            setRating(data)
            console.log(data)
        })
    }, [])

    return (
        <div style={{display: 'flex', flexFlow: 'row wrap'}}>
            <div style={{
                width: '550px',
                height: '200px',
                borderRadius: '10px',
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'center',
                margin: '2rem',
                background: theme === 'dark' ? "#FFF" : 'linear-gradient(153deg, rgba(2,0,36,1) 0%, rgba(0,0,255,1) 0%, rgba(0,212,255,1) 100%)',
                color: theme === 'dark' ? "#000" : "#FFF",
                justifyContent: 'center',
            }}>
                <p style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>Типы устройств, которые мы
                    продаем</p>
                <div style={{
                    width: 'max-content',
                    height: 'max-content',
                    padding: '30px',
                    marginTop: '1rem',
                    borderRadius: '50%',
                    border: "10px solid",
                    borderColor: theme === 'dark' ? 'rgb(13,0,255)' : '#FFF'
                }}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>{type}</span>
                </div>
            </div>

            <div style={{
                width: '550px',
                height: '200px',
                borderRadius: '10px',
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'center',
                margin: '2rem',
                background: theme === 'dark' ? "#FFF" : 'linear-gradient(153deg, rgba(2,0,36,1) 0%, rgba(0,0,255,1) 0%, rgba(0,212,255,1) 100%)',
                color: theme === 'dark' ? "#000" : "#FFF",
                justifyContent: 'center',
            }}>
                <p style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>Количество брендов, с которыми мы
                    сотрудничаем</p>
                <div style={{
                    width: 'max-content',
                    height: 'max-content',
                    padding: '30px',
                    marginTop: '1rem',
                    borderRadius: '50%',
                    border: "10px solid",
                    borderColor: theme === 'dark' ? 'rgb(13,0,255)' : '#FFF'
                }}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>{brand}</span>
                </div>
            </div>

            <div style={{
                width: '550px',
                height: '200px',
                borderRadius: '10px',
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'center',
                margin: '2rem',
                background: theme === 'dark' ? "#FFF" : 'linear-gradient(153deg, rgba(2,0,36,1) 0%, rgba(0,0,255,1) 0%, rgba(0,212,255,1) 100%)',
                color: theme === 'dark' ? "#000" : "#FFF",
                justifyContent: 'center',
            }}>
                <p style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>Общее количество устройств</p>
                <div style={{
                    width: 'max-content',
                    height: 'max-content',
                    padding: '30px',
                    marginTop: '1rem',
                    borderRadius: '50%',
                    border: "10px solid",
                    borderColor: theme === 'dark' ? 'rgb(13,0,255)' : '#FFF'
                }}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>{device}</span>
                </div>
            </div>

            <div style={{
                width: '550px',
                height: '200px',
                borderRadius: '10px',
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'center',
                margin: '2rem',
                background: theme === 'dark' ? "#FFF" : 'linear-gradient(153deg, rgba(2,0,36,1) 0%, rgba(0,0,255,1) 0%, rgba(0,212,255,1) 100%)',
                color: theme === 'dark' ? "#000" : "#FFF",
                justifyContent: 'center',
            }}>
                <p style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>Общая прибыль</p>
                <div style={{
                    width: 'max-content',
                    height: 'max-content',
                    padding: '30px',
                    marginTop: '1rem',
                    borderRadius: '50%',
                    border: "10px solid",
                    borderColor: theme === 'dark' ? 'rgb(13,0,255)' : '#FFF'
                }}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>{overPrice} ₽</span>
                </div>
            </div>

            <div style={{
                width: '550px',
                height: '200px',
                borderRadius: '10px',
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'center',
                marginTop: '2rem',
                marginLeft: '2rem',
                marginRight: '2rem',
                marginBottom: '.45rem',
                background: theme === 'dark' ? "#FFF" : 'linear-gradient(153deg, rgba(2,0,36,1) 0%, rgba(0,0,255,1) 0%, rgba(0,212,255,1) 100%)',
                color: theme === 'dark' ? "#000" : "#FFF",
                justifyContent: 'center',
            }}>
                <p style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>Общее количество заказов</p>
                <div style={{
                    width: 'max-content',
                    height: 'max-content',
                    padding: '30px',
                    marginTop: '1rem',
                    borderRadius: '50%',
                    border: "10px solid",
                    borderColor: theme === 'dark' ? 'rgb(13,0,255)' : '#FFF'
                }}>
                    <span style={{fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap'}}>{client}</span>
                </div>
            </div>

            <div style={{width: '600px', height: '230px'}}>
                <Histogram rating={rating} theme={theme}/>
            </div>

        </div>
    );
};

export default AdminAnalyticData;
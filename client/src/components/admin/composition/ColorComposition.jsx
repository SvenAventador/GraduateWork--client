import React from 'react';
import {Button, Space, Table} from "antd";
import {getAllColors, getAllMaterials} from "../../../http/deviceApi";
import {deleteColor, deleteMaterial} from "../../../http/adminApi";
import Swal from "sweetalert2";
import MaterialModal from "../modal/MaterialModal";
import ColorModal from "../modal/ColorModal";

const ColorComposition = ({colors}) => {
    const [colorList, setColorList] = React.useState(colors)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [colorId, setColorId] = React.useState(null)
    const [name, setName] = React.useState('')
    const [hex, setHex] = React.useState('')
    console.log(colors)

    React.useEffect(() => {
        if (isRefresh) {
            getAllColors().then((data) => {
                setIsRefresh(false)
                setColorList(data)
            })
        }
    }, [isRefresh])

    const deleteItem = (colorId) => {
        setColorId(colorId)

        return Swal.fire({
            icon: 'question',
            title: 'Маленькое уточнение!',
            text: 'Вы точно хотите удалить данный цвет?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Нет, не хочу!',
            confirmButtonText: 'Да, хочу!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteColor(colorId).then(() => {
                    getAllColors().then((data) => {
                        setColorId(data)
                        setIsRefresh(true)
                    }).finally(() => {
                        return Swal.fire({
                            icon: 'success',
                            title: 'Ваушки!',
                            text: 'Цвет успешно удален из системы!'
                        })
                    })
                })
            }
        })
    }

    const showUpdateModal = (colorId, colorName, hexValue) => {
        console.log(colorId, colorName, hexValue)
        setIsOpenModal(true);
        if (colorName) {
            setName(colorName);
        } else {
            setName('');
        }
        if (hexValue) {
            setHex(hexValue);
        } else {
            setHex('');
        }
        if (colorId) {
            setColorId(colorId)
        } else {
            setColorId(null)
        }
    }

    const columns = [
        {
            title: '№ типа',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование цвета',
            dataIndex: 'colorName',
            key: 'colorName',
        },
        {
            title: 'HEX-значение цвета',
            dataIndex: 'hexValue',
            key: 'hexValue',
            render: (text, record) => {
                console.log(record.hexValue);
                return (
                    <Space size={"small"}
                           style={{
                               background: record.hexValue,
                               color: record.hexValue,
                               position: "relative",
                               width: '100%',
                               height: '100%',
                               borderRadius: '10px',
                               border: '1px solid #000'
                           }}>
                        {record.hexValue}
                    </Space>
                );
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button onClick={() => showUpdateModal(record.id, record.colorName, record.hexValue)}>Изменить
                        наименование
                        цвета</Button>
                    <Button onClick={() => {
                        deleteItem(record.id)
                    }}>Удалить цвет устройства</Button>
                </Space>
            ),
        },
    ];

    const handleOk = () => {
        setIsOpenModal(false);
        getAllColors().then((data) => {
            setColorList(data)
            setIsRefresh(true)
        })
    };
    const handleCancel = () => {
        setIsOpenModal(false);
    };
    return (
        <div>
            <Table bordered
                   title={() => <Button onClick={() => showUpdateModal(null, null, null)}>Добавить цвет
                       устройства</Button>}
                   dataSource={colorList.map((color) => ({...color, key: color.id}))}
                   pagination={{
                       defaultPageSize: 6, showSizeChanger: false
                   }}
                   columns={columns}/>
            <ColorModal open={isOpenModal}
                        onOk={handleOk}
                        nameColor={name}
                        colorId={colorId}
                        valueHex={hex}
                        onCancel={handleCancel}/>
        </div>
    );
};

export default ColorComposition;
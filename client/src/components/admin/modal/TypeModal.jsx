import React from 'react';
import { Button, Input, Modal } from "antd";
import {createType, updateType} from "../../../http/adminApi";
import Swal from "sweetalert2";

const TypeModal = (props) => {
    const { open, onOk, nameType, typeId, onCancel } = props;
    const [typeName, setTypeName] = React.useState('');

    const clearData = () => {
        setTypeName('')
        onOk()
    }
    React.useEffect(() => {
        setTypeName(nameType)
    }, [nameType])

    const createAdminType = () => {
        if (typeName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название типа!'
            });
        }

        createType(typeName)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Тип успешно создан!'
                }).then(() => {
                    onOk()
                });
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Внимение!',
                    text: e.response.data.message
                });
            });
    };

    const updateAdminType = () => {
        if (typeName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название типа!'
            });
        }

        updateType(parseInt(typeId), typeName)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Тип успешно обновлен!'
                }).then(() => {
                    onOk()
                });
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Внимение!',
                    text: e.response.data.message
                });
            });
    };

    return (
        <div>
            <Modal
                title={typeId !== null ? 'Изменение типа устройств' : 'Добавление типа устройства'}
                visible={open}
                centered
                maskClosable={false}
                onOk={clearData}
                onCancel={clearData}
                footer={[
                    <Button onClick={clearData}>Отмена</Button>,
                    <Button
                        onClick={() => {
                            if (typeId !== null) {
                                updateAdminType();
                            } else {
                                createAdminType();
                            }
                            clearData()
                        }}>
                        Сохранить данные
                    </Button>
                ]}
            >
                <Input
                    placeholder="Введите название типа..."
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default TypeModal;

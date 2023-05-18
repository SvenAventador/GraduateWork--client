import React from 'react';
import { Button, Input, Modal } from "antd";
import {createType, updateType} from "../../../http/adminApi";
import Swal from "sweetalert2";

const TypeModal = (props) => {
    const { open, onOk, nameType, typeId, onCancel } = props;

    const [typeName, setTypeName] = React.useState('');

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
                onOk={onOk}
                onCancel={onCancel}
                footer={[
                    <Button onClick={onCancel}>Отмена</Button>,
                    <Button
                        onClick={() => {
                            if (typeId !== null) {
                                updateAdminType();
                            } else {
                                createAdminType();
                            }
                            onOk()
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

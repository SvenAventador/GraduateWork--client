import React from 'react';
import {Button, Input, Modal} from "antd";
import {createWireless, updateWireless} from "../../../http/adminApi";
import Swal from "sweetalert2";

const WirelessModal = (props) => {
    const {open, onOk, nameWireless, wirelessId, onCancel} = props;
    const [wirelessName, setWirelessName] = React.useState('');

    const clearData = () => {
        setWirelessName('')
        onOk()
    }

    React.useEffect(() => {
        if (nameWireless !== null) {
            setWirelessName(nameWireless)
        }
    }, [nameWireless])

    const createAdminWireless = () => {
        if (wirelessName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название дополнения!'
            });
        }

        createWireless(wirelessName)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Дополнение успешно создано!'
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

    const updateAdminWireless = () => {
        if (wirelessName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название дополнения!'
            });
        }

        updateWireless(parseInt(wirelessId), wirelessName)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Дополенние успешно обновлен!'
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
                title={wirelessId !== null ? 'Изменение дополнения устройств' : 'Добавление дополнения устройства'}
                visible={open}
                centered
                maskClosable={false}
                onOk={clearData}
                onCancel={clearData}
                footer={[
                    <Button onClick={clearData}>Отмена</Button>,
                    <Button
                        onClick={() => {
                            if (wirelessId !== null) {
                                updateAdminWireless();
                            } else {
                                createAdminWireless();
                            }
                            clearData()
                        }}>
                        Сохранить данные
                    </Button>
                ]}
            >
                <Input
                    placeholder="Введите название дополнения..."
                    value={wirelessName}
                    onChange={(e) => setWirelessName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default WirelessModal;

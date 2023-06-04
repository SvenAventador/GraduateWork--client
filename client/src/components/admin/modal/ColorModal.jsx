import React from 'react';
import { Button, Input, Modal, ColorPicker, theme, Space } from "antd";
import {createColor, updateColor} from "../../../http/adminApi";
import Swal from "sweetalert2";

const ColorModal = (props) => {
    const { open, onOk, colorId, nameColor, valueHex, onCancel } = props;
    const [colorName, setColorName] = React.useState('');
    const [hexValue, setHexValue] = React.useState('')

    const clearData = () => {
        setColorName('')
        onOk()
    }

    React.useEffect(() => {
        setColorName(nameColor);
    }, [nameColor]);

    React.useEffect(() => {
        setHexValue(valueHex);
    }, [valueHex]);

    const handleColorChange = (color) => {
        setColor(color);
        setHexValue(prevHexValue => {
            const hex = typeof color === 'string' ? color : color.toHexString();
            return hex;
        });
    };

    const { token } = theme.useToken();
    const [color, setColor] = React.useState(hexValue || token.colorPrimary);
    const bgColor = React.useMemo(() => (typeof color === 'string' ? color : color.toHexString()), [color]);

    React.useEffect(() => {
        setColor(valueHex || token.colorPrimary)
    }, [valueHex, token.colorPrimary])

    const createAdminColor = () => {
        if (colorName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название цвета'
            });
        }
        createColor(colorName, bgColor)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Цвет успешно создан!'
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

    const updateAdminColor = () => {
        if (colorName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название цвета'
            });
        }

        updateColor(colorId, colorName, hexValue)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Цвет успешно создан!'
                }).then(() => {
                    onOk()
                })
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Внимение!',
                    text: e.response.data.message
                });
            });
    }

    return (
        <div>
            <Modal
                title={colorId ? 'Изменение цвета устройства' : 'Добавление цвета устройства'}
                visible={open}
                centered
                maskClosable={false}
                onOk={clearData}
                onCancel={clearData}
                footer={[
                    <Button onClick={clearData}>Отмена</Button>,
                    <Button
                        onClick={() => {
                            if (colorId !== null) {
                                updateAdminColor()
                            } else {
                                createAdminColor();
                            }
                            clearData()
                        }}
                    >
                        Сохранить данные
                    </Button>
                ]}
            >
                <ColorPicker value={color} onChange={handleColorChange}>
                    <Space>
                        <div
                            style={{
                                width: token.sizeMD,
                                height: token.sizeMD,
                                borderRadius: token.borderRadiusSM,
                                backgroundColor: bgColor
                            }}
                        />
                        <span>{bgColor}</span>
                    </Space>
                </ColorPicker>
                <Input
                    placeholder="Введите название цвета..."
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default ColorModal;
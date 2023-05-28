import React, { useState, useEffect } from "react";
import { Input, Slider } from "antd";
import { Context } from "../../../index";

const DeviceSlider = ({ minPrice, maxPrice }) => {
    const { device } = React.useContext(Context);
    let sliderMaxValue = 1_000_000;
    const sliderMinValue = 10_000;

    const [sliderValues, setSliderValues] = useState([minPrice, maxPrice]);
    const [inputMinValue, setInputMinValue] = useState(minPrice);
    const [inputMaxValue, setInputMaxValue] = useState(maxPrice);

    useEffect(() => {
        setSliderValues([minPrice, maxPrice]);
        setInputMinValue(minPrice);
        setInputMaxValue(maxPrice);
    }, [minPrice, maxPrice]);

    const handleSliderChange = (values) => {
        setSliderValues(values);
        device.setMinPrice(values[0]);
        device.setMaxPrice(values[1]);
    };

    const handleMinInputChange = (event) => {
        const minValue = parseInt(event.target.value, 10);
        setInputMinValue(minValue);
    };

    const handleMaxInputChange = (event) => {
        const maxValue = parseInt(event.target.value, 10);
        setInputMaxValue(maxValue);
    };

    const handleInputBlur = () => {
        device.setMinPrice(inputMinValue);
        device.setMaxPrice(inputMaxValue);
        setSliderValues([inputMinValue, inputMaxValue]);
    };

    return (
        <>
            <Slider
                min={sliderMinValue}
                max={sliderMaxValue}
                range
                defaultValue={[minPrice, maxPrice]}
                step={1}
                value={sliderValues}
                allowCross={true}
                onChange={handleSliderChange}
            />

            <Input
                type="number"
                min={sliderMinValue}
                max={sliderMaxValue}
                value={inputMinValue}
                onChange={handleMinInputChange}
                onBlur={handleInputBlur}
            />

            <Input
                type="number"
                min={sliderMinValue}
                max={sliderMaxValue}
                value={inputMaxValue}
                onChange={handleMaxInputChange}
                onBlur={handleInputBlur}
            />
        </>
    );
};

export default DeviceSlider;

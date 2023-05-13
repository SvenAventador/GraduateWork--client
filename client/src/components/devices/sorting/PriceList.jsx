import React, { useState } from "react";
import { Slider } from "antd";
import { Context } from "../../../index";

const DeviceSlider = ({ minPrice, maxPrice }) => {
    const { device } = React.useContext(Context);
    const [sliderValues, setSliderValues] = useState([minPrice, maxPrice]);

    const handleSliderChange = (values) => {
        setSliderValues(values);
        device.setMinPrice(values[0]);
        device.setMaxPrice(values[1]);
    };

    return (
        <Slider
            range={{
                draggableTrack: true
            }}
            min={minPrice}
            max={maxPrice}
            step={1}
            value={sliderValues}
            allowCross={true}
            onChange={handleSliderChange}
        />
    );
};

export default DeviceSlider;

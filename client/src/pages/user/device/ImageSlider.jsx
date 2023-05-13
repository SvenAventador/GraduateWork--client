import React from 'react';

import {ReactComponent as Left} from "../../../assets/svg/device/left.svg";
import {ReactComponent as Right} from "../../../assets/svg/device/right.svg";

function ImageSlider({images}) {
    const [mainImage, setMainImage] = React.useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const [startIndex, setStartIndex] = React.useState(0);
    const imagesToShow = images.slice(startIndex, startIndex + 5);

    React.useEffect(() => {
        const mainImg = images.find((img) => img.isMainImage) || images[0];
        setMainImage(mainImg);
        setSelectedImageIndex(images.indexOf(mainImg));
    }, [images]);

    const handleImageClick = (image, index) => {
        setMainImage(image);
        setSelectedImageIndex(index);
    };

    const handlePrevClick = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (startIndex + 5 < images.length) {
            setStartIndex(startIndex + 1);
        }
    };

    return (
        <div className={"image-list"}>
            <div className="image-list--main">
                {mainImage && (
                    <img
                        src={process.env.REACT_APP_API_PATH + '/' + mainImage.imagePath}
                        alt="main image"
                        aria-label="main image"
                    />
                )}
            </div>
            {
                images.length > 5 && (
                    <div className="image-list--secondary">
                        <button className="image-list__btn--prev btn-reset"
                                onClick={handlePrevClick}
                                disabled={startIndex === 0}>
                            <Left />
                        </button>
                        {imagesToShow.map((image, index) => (
                            <img
                                key={image.id}
                                src={process.env.REACT_APP_API_PATH + '/' + image.imagePath}
                                alt=""
                                style={{
                                    border:
                                        index + startIndex === selectedImageIndex ? "1px solid var(--borderColor)" : "none", // используем index и startIndex
                                }}
                                onClick={() => handleImageClick(image, images.indexOf(image))}
                            />
                        ))}
                        <button
                            className="image-list__btn--next btn-reset"
                            onClick={handleNextClick}
                            disabled={startIndex + 5 >= images.length}>
                            <Right />
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default ImageSlider;

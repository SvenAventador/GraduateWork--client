import React from 'react'

function ImageSlider({ images }) {
    const [mainImage, setMainImage] = React.useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const imagesToShow = images.slice(1, 6);

    React.useEffect(() => {
        if (images && images.length > 0) {
            const mainImg = images.find((img) => img.isMainImage);
            setMainImage(mainImg || images[0]);
        }
    }, [images]);

    const handleImageClick = (image, index) => {
        setMainImage(image);
        setSelectedImageIndex(index);
    };

    const handlePrevClick = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (selectedImageIndex < imagesToShow.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {mainImage && (
                    <img src={process.env.REACT_APP_API_PATH + '/' + mainImage.imagePath} alt="" style={{ height: "500px" }} />
                )}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {imagesToShow &&
                    imagesToShow.map((image, index) => (
                        <img
                            key={image.id}
                            src={process.env.REACT_APP_API_PATH + '/' + image.imagePath}
                            alt=""
                            style={{
                                height: "100px",
                                margin: "10px",
                                cursor: "pointer",
                                border:
                                    index === selectedImageIndex ? "1px solid black" : "none",
                            }}
                            onClick={() => handleImageClick(image, index)}
                        />
                    ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={handlePrevClick} disabled={selectedImageIndex === 0}>
                    Prev
                </button>
                <button
                    onClick={handleNextClick}
                    disabled={selectedImageIndex === imagesToShow.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}


export default ImageSlider
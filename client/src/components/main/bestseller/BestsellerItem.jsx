import React from 'react';

const BestsellerItem = (props) => {
    const { id, image, name, brand, price, cart, onClick } = props;
    return (
        <div>
            <div key={id}
                 className="bestseller__card"
                 onClick={() => onClick}>
                <div className="bestseller__top">
                    <img src={image}
                         alt={`Изображение товара ${name}`}
                         aria-label={`Изображение ${name}`}/>
                </div>
                <div className="bestseller__bottom">
                    <div className="bestseller__info">
                        {brand + " " + name}
                    </div>
                    <div className="bestseller__buy">
                        <p className="bestseller__price">
                            {"от " + price + " р"}
                        </p>
                        <div className="bestseller__cart">
                            {cart}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestsellerItem;
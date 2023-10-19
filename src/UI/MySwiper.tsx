import React from 'react';
import "../Styles/UIStyle/UIStyle.scss"

type MySwiperProps = {
    backStyle?: string | null,
    blockStyle?: string | null,
    handleOnClick: () => void,
    value: boolean | string,
}

const MySwiper: React.FC<MySwiperProps> = ({backStyle, blockStyle, handleOnClick, value}: MySwiperProps) => {
    return (
        <div className={`swiper ${value ? "swiper-active" : ""} ${backStyle}`} onClick={handleOnClick}>
            <div className={`swiper__block ${blockStyle}`}>

            </div>
        </div>
    );
};

export default MySwiper;

import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Swiper, SwiperSlide} from "swiper/react";
import answerStore from "../../../../Store/GameStores/AnswerStore";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import situationStore from "../../../../Store/GameStores/SituationStore";
import {reactions} from "../../../../assets/assetsPicker";


const GameSendReactionStage: React.FC = observer(() => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        console.log(currentSlide)
    }, [currentSlide])

    const swiperSlides = Array.from(answerStore.allLobbySituationAnswers, answer =>
        <SwiperSlide key={answer.answerId}>
            <div className="reactions__gif">
                <img src={answer.answerGif?.gif || answer.answerGif?.mediumGif}
                     alt="answerGif"/>
            </div>
        </SwiperSlide>
    )

    const reactionsArray = Array.from(reactions, (reaction, index) =>
        <img key={index} src={reaction.imgSrc.default}
             alt="reactionImage"
             className="reactions__reaction"/>
    )

    return (
        <section className="game__reactions">
            <p className="reactions__title">
                {situationStore.currentRoundSituation?.situationText || ""}
            </p>
                <Swiper spaceBetween={30}
                        slidesPerView={1}
                        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                        navigation={{nextEl: '.reactions__reaction'}}
                        modules={[Navigation]}
                        className="reactions__swiper">
                    {swiperSlides ? swiperSlides : ""}
                </Swiper>
            <div className="reactions__reactions">
                {reactionsArray ? reactionsArray : ""}
            </div>
        </section>
    );
});

export default GameSendReactionStage;

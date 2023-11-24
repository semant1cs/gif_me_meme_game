import React, {useRef} from 'react';
import {observer} from "mobx-react-lite";
import {SwiperRef, Swiper, SwiperSlide} from "swiper/react";
import answerStore from "../../../../Store/GameStores/AnswerStore";
import 'swiper/css';
import 'swiper/css/navigation';
import situationStore from "../../../../Store/GameStores/SituationStore";
import {reactions} from "../../../../assets/assetsPicker";
import reactionStore from "../../../../Store/GameStores/ReactionStore";
import gameStore from "../../../../Store/GameStores/GameStore";


const GameSendReactionStage: React.FC = observer(() => {
        const swiperRef = useRef<SwiperRef | null>(null);

        const swiperSlides = Array.from(answerStore.allLobbySituationAnswers, answer =>
            <SwiperSlide key={answer.answerId}>
                <div className="reactions__gif">
                    <img src={answer.answerGif?.gif || answer.answerGif?.mediumGif}
                         alt="answerGif"/>
                </div>
            </SwiperSlide>
        )

        const reactFunction = (index: number) => {
            const currentSlide = swiperRef.current?.swiper.activeIndex

            if (swiperRef.current?.swiper && currentSlide !== undefined &&
                currentSlide + 1 < swiperRef.current?.swiper.slides.length) {
                reactionStore.sendReaction(index, currentSlide)
                    .then(() => swiperRef.current?.swiper.slideNext())
            } else if (currentSlide !== undefined)
                reactionStore.sendReaction(index, currentSlide)
                    .then(() => gameStore.setCurrentUserStage("WaitingAfterReaction").then())
        }

        return (
            <section className="game__reactions">
                <p className="reactions__title">
                    {situationStore.currentRoundSituation?.situationText || ""}
                </p>
                <Swiper spaceBetween={30}
                        ref={swiperRef}
                        allowTouchMove={false}
                        slidesPerView={1}
                        className="reactions__swiper"
                >
                    {swiperSlides ? swiperSlides : ""}
                </Swiper>
                <div className="reactions__reactions">
                    {
                        reactions ?
                            reactions.map((reaction, index) =>
                                <img key={index} src={reaction.imgSrc.default}
                                     onClick={() => reactFunction(index)}
                                     alt="reactionImage"
                                     className="reactions__reaction"/>
                            ) : ""
                    }
                </div>
            </section>
        );
    }
);

export default GameSendReactionStage;

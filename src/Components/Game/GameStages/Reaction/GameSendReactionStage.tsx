import React, {useEffect, useRef, useState} from 'react';
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

        const [isAnimate, setIsAnimate] = useState(false)
        const [clicked, setClicked] = useState(0)

        const [timeRemaining, setTimeRemaining] = useState<number>(15)
        const [timeEnd, setTimeEnd] = useState(false)

        useEffect(() => {
            if (timeEnd) return

            const timerID = setInterval(() => {
                if (timeRemaining === 0) {
                    setTimeEnd(true)
                    reactFunction(0)
                } else
                    setTimeRemaining(timeRemaining - 1)
            }, 1000);
            return () => clearInterval(timerID);
        })

        const swiperSlides = Array.from(answerStore.allLobbySituationAnswers, answer =>
            <SwiperSlide key={answer.answerId}>
                <div className="reactions__gif">
                    {
                        answer.answerGif
                            ?
                            <img src={answer.answerGif?.gif || answer.answerGif?.mediumGif}
                                 alt="answerGif"/>
                            : "Пользователь не выбрал гифку"
                    }
                </div>
            </SwiperSlide>
        )

        const reactFunction = (index: number) => {
            const currentSlide = swiperRef.current?.swiper.activeIndex

            if (swiperRef.current?.swiper && currentSlide !== undefined &&
                currentSlide + 1 < swiperRef.current?.swiper.slides.length) {

                setTimeEnd(false)
                setTimeRemaining(15)
                reactionStore.sendReaction(index, currentSlide)
                    .then(() => swiperRef.current?.swiper.slideNext())

            } else if (currentSlide !== undefined)
                reactionStore.sendReaction(index, currentSlide)
                    .then(() => gameStore.setCurrentUserStage("WaitingAfterReaction"))
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
                <div className="reactions__timer">
                    <div className="timer">
                        <div className="timer__logo">
                            <svg width="25" height="25" viewBox="0 0 100 100" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="50" fill="black"/>
                                <circle cx="50" cy="50" r="42" fill="white"/>
                                <path d="M50 15L41.3397 30H58.6603L50 15ZM51.5 50V28.5H48.5V50H51.5Z" fill="black"/>
                                <path
                                    d="M70 62L62.3231 46.4737L52.7154 60.8853L70 62ZM48.1679 49.2481L57.9353 55.7596L59.5994 53.2635L49.8321 46.7519L48.1679 49.2481Z"
                                    fill="black"/>
                            </svg>
                        </div>
                        <div className="timer-remaining-time-value">{timeRemaining}</div>
                    </div>
                </div>
                <div className="reactions__reactions">
                    {
                        reactions ?
                            reactions.map((reaction, index) =>
                                <div key={index}
                                     onClick={() => {
                                         if (isAnimate) {
                                             alert("Дождитесь отправки сообщения")
                                         }
                                         setIsAnimate(true)
                                         setClicked(index)
                                         setTimeout(() => {
                                             setIsAnimate(false)
                                             setClicked(0)
                                             reactFunction(index)
                                         }, 600)
                                     }}
                                     className={`reactions__reaction 
                                     ${isAnimate && clicked === index ? "reaction__animate" : ""}`}>
                                    <img src={reaction.imgSrc.default} alt="reactionImage"/>
                                </div>
                            ) : ""
                    }
                </div>
            </section>
        );
    }
);

export default GameSendReactionStage;

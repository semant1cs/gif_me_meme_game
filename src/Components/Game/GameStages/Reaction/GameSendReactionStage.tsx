import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Swiper, SwiperSlide} from "swiper/react";
import answerStore from "../../../../Store/GameStores/AnswerStore";


const GameSendReactionStage: React.FC = observer(() => {
    useEffect(() => {
    })

    return (
        <section className="game__reactions">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    answerStore.allLobbySituationAnswers.map(answer =>
                        <SwiperSlide key={answer.answerId}>
                            <img src={answer.answerGif?.mediumGif} alt="answerGif"/>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    );
});

export default GameSendReactionStage;

import React, {useEffect, useState} from 'react';
import '../Styles/UIStyle/UIStyle.scss'

interface IPropTimer {
    seconds: number,
    handleOnTimerEnd?: () => void;
}

const MyTimer: React.FC<IPropTimer> = ({seconds, handleOnTimerEnd}) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(seconds)
    const [timeEnd, setTimeEnd] = useState(false)

    useEffect(() => {
        if (timeEnd) return

        const timerID = setInterval(() => {
            if (timeRemaining === 0) {
                handleOnTimerEnd ? handleOnTimerEnd() : ""
                setTimeEnd(true)
            } else
                setTimeRemaining(timeRemaining - 1)
        }, 1000);
        return () => clearInterval(timerID);
    })

    return (
        <div className="timer">
            <div className="timer__logo">
                <svg width="25" height="25" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    );
};

export default MyTimer;

import { useEffect, useRef } from "react";

interface EndingProp {
    endingNumber: number;
}

interface possibleEndings {
    sound: string;
    quote: string;
    image: string;
}

export const Ending = (prop: EndingProp) => {
    const { endingNumber } = prop;

    const possibleEndings: Record<number, possibleEndings> = {
        1: {
            sound: "mainloop_happyarranged.wav",
            quote: "She enjoyed the date!",
            image: "p-chan.png",
        },
        2: {
            sound: "ending_dead.wav",
            quote: "She thinks you don't love her anymore.",
            image: "alone.jpg",
        },
        3: {
            sound: "event_kincho.wav",
            quote: "I think that's too much...",
            image: "doit.png"
        },
        4: {
            sound: "ending_kenjo.wav",
            quote: "She wasn't expecting this.",
            image: "mcdo.png",
        },
    };

    const bgm = useRef(
        new Audio(`/audio/${possibleEndings[endingNumber].sound}`)
    );

    useEffect(() => {
        bgm.current.loop = true;
        bgm.current.volume = 0.3;
        bgm.current.play();
    });

    return (
        <div className="ending">
            <img
                src={`/images/ending/${possibleEndings[endingNumber].image}`}
                className="ending__image"
            />
            <div className="ending__message">
                {endingNumber === 1 && <h1>Happy Valentine's Day!</h1>}
                <p>{possibleEndings[endingNumber].quote}</p>
                <p>Ending #{endingNumber}</p>
            </div>
        </div>
    );
};

import { useEffect, useRef, useState } from "react";

type Message = {
    id: number;
    text: string;
    sender: "pien" | "ame";
    icon?: "beg" | "ok" | "pien" | "love" | "w" | "ded";
    ending?: number;
};

type ReplyOption = {
    id: number;
    text: string;
    next: number;
    sender: "ame";
};

const pienMessages: Message[] = [
    { id: 1, text: "will you be my valentine?", sender: "pien", icon: "beg" },
    { id: 2, text: "pien", sender: "pien", icon: "pien" },
    { id: 3, text: "YAY!", sender: "pien", icon: "love" },
    { id: 4, text: "EHHH?!", sender: "pien", icon: "beg", ending: 1 },
    { id: 5, text: "okay.", sender: "pien", icon: "ded", ending: 2 },
    { id: 6, text: "e-ecchi", sender: "pien", icon: "ok", ending: 3 },
    {
        id: 7,
        text: "I'M BRINGING YOU TO MCDONALD'S :>",
        sender: "pien",
        icon: "w",
        ending: 4,
    },
];

const replyOptions: Record<number, ReplyOption[]> = {
    1: [
        { id: 1, text: "yes", next: 3, sender: "ame" },
        { id: 2, text: "no", next: 2, sender: "ame" },
    ],
    2: [
        {
            id: 1,
            text: "i'm sorry, p-chan, but YOU'LL be my valentine",
            next: 4,
            sender: "ame",
        },
        { id: 2, text: "i don't wanna go out", next: 5, sender: "ame" },
    ],
    3: [
        { id: 1, text: "so can we DO it today?", next: 6, sender: "ame" },
        { id: 2, text: "where are we heading?", next: 7, sender: "ame" },
    ],
};

export default function JINE({
    setEndingNumber,
}: {
    setEndingNumber: (ending: number) => void;
}) {
    const [chat, setChat] = useState<Message[]>([]);
    const [currentMessageId, setCurrentMessageId] = useState<number>(0);
    const jineSend = useRef(new Audio("/audio/jine_send.wav"));
    const jineReceive = useRef(new Audio("/audio/jine_receive.wav"));

    useEffect(() => {
        const wait = async () => {
            setTimeout(() => {
                setChat([pienMessages[0]]);
                setCurrentMessageId(1);
                jineReceive.current.play();
            }, 1000);
        };
        wait();
    }, []);

    const handleReply = async (reply: ReplyOption) => {
        const userReply: Message = {
            id: chat.length + 1,
            text: reply.text,
            sender: "ame",
        };
        const nextMessage = pienMessages.find((msg) => msg.id === reply.next);
        if (!nextMessage) return;

        setChat([...chat, userReply]);
        setCurrentMessageId(0);
        jineSend.current.play();

        await setTimeout(() => {
            setChat((prevChat) => [...prevChat, nextMessage]);
            setCurrentMessageId(nextMessage.id);
            jineReceive.current.play();
        }, 3000); // 3-second delay before showing the next message

        if (nextMessage.ending) {
            await setTimeout(() => {
                setEndingNumber(nextMessage.ending as number);
            }, 6000);
        }
    };

    return (
        <div
            className="jine__chat_window"
            style={{ backgroundImage: "url('/images/JINEBG.png')" }}
        >
            <div className="jine__messages">
                {chat.map((msg) => (
                    <div
                        key={msg.id}
                        className={`jine__message_div--${msg.sender}`}
                    >
                        {msg.icon && (
                            <img
                                className="jine__message_icon"
                                src={`/images/icon/${msg.icon}.png`}
                            />
                        )}
                        <div
                            className={`jine__message jine__message--${msg.sender}`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            {replyOptions[currentMessageId] && (
                <div className="jine__options">
                    {replyOptions[currentMessageId].map(
                        (option: ReplyOption) => (
                            <div
                                className={`jine__message_div--${option.sender}`}
                                key={option.id}
                            >
                                <div
                                    key={option.id}
                                    onClick={() => handleReply(option)}
                                    className="jine__option_message"
                                >
                                    {option.text}
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

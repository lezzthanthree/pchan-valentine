import { useEffect, useRef, useState } from "react";

type Message = {
    id: number;
    text: string;
    sender: "pien" | "ame";
};

type ReplyOption = {
    id: number;
    text: string;
    next: number;
    sender: "ame";
};

const pienMessages: Message[] = [
    { id: 1, text: "will you be my valentine?", sender: "pien" },
    { id: 2, text: "pien", sender: "pien" },
    { id: 3, text: "YAY!", sender: "pien" },
    { id: 4, text: "EHHH?!", sender: "pien" },
    { id: 5, text: "i'm ded...", sender: "pien" },
    { id: 6, text: "e-ecchi", sender: "pien" },
    { id: 7, text: "I'M BRINGING YOU TO MCDONALD'S :>", sender: "pien" },
];

const replyOptions: Record<number, ReplyOption[]> = {
    1: [
        { id: 1, text: "yes", next: 3, sender: "ame" },
        { id: 2, text: "no", next: 2, sender: "ame" },
    ],
    2: [
        {
            id: 1,
            text: "i'm sorry, p-chan, but I'LL take you to valentine's",
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

export default function JINE() {
    const [chat, setChat] = useState<Message[]>([]);
    const [currentMessageId, setCurrentMessageId] = useState<number>(0);
    const jineSend = useRef(new Audio("/audio/jine_send.wav"));
    const jineReceive = useRef(new Audio("/audio/jine_receive.wav"));

    useEffect(() => {
        const wait = async () => {
            setTimeout(() => {
                setChat([
                    {
                        id: 1,
                        text: "Will you be my Valentine?",
                        sender: "pien",
                    },
                ]);
                setCurrentMessageId(1);
                jineReceive.current.play();
            }, 1000);
        };
        wait();
    }, []);

    const handleReply = (reply: ReplyOption) => {
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

        setTimeout(() => {
            setChat((prevChat) => [...prevChat, nextMessage]);
            setCurrentMessageId(nextMessage.id);
            jineReceive.current.play();
        }, 3000); // 3-second delay before showing the next message
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

import { useState, useEffect } from "react";
import JINE from "./components/JINE";
import { Window } from "./components/Window";
import { Ending } from "./components/Ending";

function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [endingNumber, setEndingNumber] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!endingNumber ? (
                isMobile ? (
                    <JINE setEndingNumber={setEndingNumber} />
                ) : (
                    <Window title="JINE">
                        <JINE setEndingNumber={setEndingNumber} />
                    </Window>
                )
            ) : (
                <Window title="Ending">
                    <Ending endingNumber={endingNumber} />
                </Window>
            )}
        </>
    );
}

export default App;

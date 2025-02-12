import { useState, useEffect } from "react";
import JINE from "./components/JINE";
import { Window } from "./components/Window";

function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? (
        <JINE />
    ) : (
        <Window title="JINE">
            <JINE />
        </Window>
    );
}

export default App;

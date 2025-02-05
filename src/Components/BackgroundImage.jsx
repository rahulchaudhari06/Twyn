import { useEffect, useState } from "react";
import darkBg from "../assets/dark-1.png"; 
import lightBg from "../assets/bg-light.png"


export default function BackgroundImage({ children, mode }) {
    console.log("BackgroundImage mode:", mode);
    // const [theme, setTheme] = useState("light");
    const [background, setBackground] = useState(darkBg);

    useEffect(() => {
        setBackground(mode === "Dark" ? darkBg : lightBg);
    }, [mode]);

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100vh",
                    opacity: 0.4,
                    zIndex: -50,
                    filter: "blur(4px)"
                }}
            />
            {children}
        </>
    );
}

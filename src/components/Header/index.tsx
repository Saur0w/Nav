"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./style.module.scss";

interface CursorPosition {
    left: number;
    width: number;
    opacity: number;
}

interface TabProps {
    children: React.ReactNode;
    setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
}

interface CursorProps {
    position: CursorPosition;
}


export default function SlideTabsExample(){
    return (
        <div className={styles.wrapper}>
            <SlideTabs />
        </div>
    );
};



const SlideTabs: React.FC = () => {
    const [position, setPosition] = useState<CursorPosition>({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const handleMouseLeave = () => {
        setPosition((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <ul className={styles.nav} onMouseLeave={handleMouseLeave}>
            {["Home", "About", "Menu"].map((label) => (
                <Tab key={label} setPosition={setPosition}>
                    {label}
                </Tab>
            ))}
            <Cursor position={position} />
        </ul>
    );
};


const Tab: React.FC<TabProps> = ({ children, setPosition }) => {
    const ref = useRef<HTMLLIElement>(null);

    const handleMouseEnter = () => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
        });
    };

    return (
        <li ref={ref} className={styles.tab} onMouseEnter={handleMouseEnter}>
            {children}
        </li>
    );
};


const Cursor: React.FC<CursorProps> = ({ position }) => {
    const cursorRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (!cursorRef.current) return;

        gsap.to(cursorRef.current, {
            left: position.left,
            width: position.width,
            opacity: position.opacity,
            duration: 0.25,
            ease: "power2.out",
        });
    }, [position]);

    return <li ref={cursorRef} className={styles.cursor} />;
};
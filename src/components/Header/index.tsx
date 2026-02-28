"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

gsap.registerPlugin(SplitText);

const NAV_ITEMS = [
    { label: "Home", href: "/"},
    { label: "About", href: "/"},
    { label: "Projects", href: "/"},
    { label: "Contact", href: "/"},
]

export default function Header() {
    const pillRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const navRef = useRef<HTMLElement>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        if (!pillRef.current) return;

        const { offsetLeft, offsetWidth } = e.currentTarget;
        const link = e.currentTarget.querySelector("a");

        gsap.to(pillRef.current, {
            x: offsetLeft,
            width: offsetWidth ,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
        });

        if (link) {
            gsap.set(link, {
                color: "#000000",
            })
        }

        const otherLinks = e.currentTarget.parentElement?.querySelectorAll("a");
        otherLinks?.forEach((other) => {
            if (other != link) {
                gsap.set(other, { color: "#ffffff"})
            }
            }
        )
    };

    const handleMouseLeave = () => {
        if (!pillRef.current) return;

        gsap.to(pillRef.current, {
            opacity: 0,
            duration: 0.3,
        });
    };

    const mouseEnterHeader = () => {
        if (!containerRef.current || !paraRef.current) return;

        const tl = gsap.timeline();

        tl.to(paraRef.current, {
            y: "-40%",
            opacity: 0,
        }, 0);

        tl.to(containerRef.current, {
            width: "600px",
            duration: 0.8,
            ease: "power2.out"
        }, 0);

        tl.to(navRef.current, {
            opacity: 1,
        }, 0)
    }

    const onMouseLeaveHeader = () => {

        const tl = gsap.timeline();

        tl.to(containerRef.current, {
            width: "110px",
            duration: 0.8,
            ease: "power2.out"
        }, 0);

        tl.to(paraRef.current, {
            y: "0%",
            opacity: 1,
        }, 0);

        tl.to(navRef.current, {
            opacity: 0,
        }, 0)
    }

    return (
        <header className={styles.header}>
            <div
                className={styles.container}
                ref={containerRef}
                onMouseEnter={mouseEnterHeader}
                onMouseLeave={onMouseLeaveHeader}
            >
                <p ref={paraRef}>Menu</p>
                <nav ref={navRef}>
                    <ul onMouseLeave={handleMouseLeave}>
                        <div className={styles.pill} ref={pillRef} />
                        {NAV_ITEMS.map((navLink) => (
                            <li
                                key={navLink.label}
                                onMouseEnter={handleMouseEnter}
                            >
                                <Link href={navLink.href}>
                                    {navLink.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
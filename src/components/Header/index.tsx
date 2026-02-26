"use client";

import styles from "./style.module.scss";
import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <p>Menu</p>

                <nav className={styles.nav}>
                    <ul>
                        <div className={styles.pill} />
                        {NAV_LINKS.map((link) => (
                            <li
                                key={link.label}
                            >
                                <Link href={link.href}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
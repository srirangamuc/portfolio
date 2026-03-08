import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { personalInfo } from "../data";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};

const links = [
    {
        label: "Email",
        href: `mailto:${personalInfo.email}`,
        icon: <FiMail />,
        detail: personalInfo.email,
    },
    {
        label: "GitHub",
        href: personalInfo.github,
        icon: <FiGithub />,
        detail: "github.com/srirangamuc",
    },
    {
        label: "LinkedIn",
        href: personalInfo.linkedin,
        icon: <FiLinkedin />,
        detail: "srirangam-umesh-chandra",
    },
    {
        label: "LeetCode",
        href: personalInfo.leetcode,
        icon: <SiLeetcode />,
        detail: "@xinirs",
    },
];

export default function Contact() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section id="contact" className="section" ref={ref}>
            <div className="warm-blob warm-blob-1" />

            <motion.div
                className="section-inner"
                style={{ y: parallaxY, textAlign: "center" }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.hr className="section-divider" variants={fadeUp} custom={0} style={{ margin: "0 auto 2rem" }} />
                    <motion.h2 className="section-title" variants={fadeUp} custom={0} style={{ textAlign: "center" }}>
                        Get in Touch
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        custom={1}
                        style={{
                            fontSize: "1.05rem",
                            color: "var(--text-secondary)",
                            maxWidth: 480,
                            margin: "0 auto 3rem",
                            lineHeight: 1.7,
                        }}
                    >
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </motion.p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "1rem",
                            maxWidth: 700,
                            margin: "0 auto",
                        }}
                    >
                        {links.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                                variants={fadeUp}
                                custom={2 + i}
                                className="glass-card"
                                style={{
                                    padding: "1.5rem 1rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0.6rem",
                                    textDecoration: "none",
                                }}
                            >
                                <span style={{ fontSize: "1.4rem", color: "var(--text-primary)" }}>
                                    {link.icon}
                                </span>
                                <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                                    {link.label}
                                </span>
                                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                                    {link.detail}
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

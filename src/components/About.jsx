import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "../data";

const fadeSlideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.7,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};

export default function About() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section id="about" className="section" ref={ref}>
            <div className="warm-blob warm-blob-3" />

            <motion.div
                className="section-inner"
                style={{ y: parallaxY }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.hr className="section-divider" variants={fadeSlideUp} custom={0} />
                    <motion.h2 className="section-title" variants={fadeSlideUp} custom={0}>
                        About Me
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeSlideUp} custom={1}>
                        A bit about who I am and what drives me.
                    </motion.p>

                    <motion.p
                        variants={fadeSlideUp}
                        custom={2}
                        style={{
                            fontSize: "1.1rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.9,
                            maxWidth: 680,
                            marginBottom: "2.5rem",
                        }}
                    >
                        {personalInfo.bio}
                    </motion.p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "1rem",
                        }}
                    >
                        {personalInfo.highlights.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeSlideUp}
                                custom={3 + i}
                                className="glass-card"
                                style={{
                                    padding: "1.5rem",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "1rem",
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        background: "var(--accent-warm)",
                                        marginTop: "0.55rem",
                                        flexShrink: 0,
                                    }}
                                />
                                <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

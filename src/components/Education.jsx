import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { education, leadership } from "../data";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.7,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};

export default function Education() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section id="education" className="section" ref={ref}>
            <motion.div className="section-inner" style={{ y: parallaxY }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.hr className="section-divider" variants={fadeUp} custom={0} />
                    <motion.h2 className="section-title" variants={fadeUp} custom={0}>
                        Education
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={1}>
                        Academic background and activities.
                    </motion.p>

                    {/* Degree card */}
                    <motion.div
                        className="glass-card"
                        variants={fadeUp}
                        custom={2}
                        style={{ padding: "2rem", marginBottom: "2.5rem" }}
                    >
                        <h3
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                marginBottom: "0.35rem",
                            }}
                        >
                            {education.degree}
                        </h3>
                        <p
                            style={{
                                fontSize: "1rem",
                                color: "var(--accent-warm)",
                                fontWeight: 600,
                                marginBottom: "0.25rem",
                            }}
                        >
                            {education.institution}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: "2rem",
                                flexWrap: "wrap",
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                marginTop: "0.6rem",
                            }}
                        >
                            <span>{education.period}</span>
                            <span>CGPA: {education.cgpa}</span>
                        </div>
                    </motion.div>

                    {/* Leadership */}
                    <motion.h3
                        variants={fadeUp}
                        custom={3}
                        style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            marginBottom: "1rem",
                        }}
                    >
                        Leadership & Volunteering
                    </motion.h3>
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                        {leadership.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                custom={4 + i}
                                className="glass-card"
                                style={{
                                    padding: "1.25rem 1.5rem",
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
                                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
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

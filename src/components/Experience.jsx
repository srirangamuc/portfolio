import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "../data";

const fadeSlideLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.7,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};

export default function Experience() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section id="experience" className="section" ref={ref}>
            <motion.div className="section-inner" style={{ y: parallaxY }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    <motion.hr className="section-divider" variants={fadeSlideLeft} custom={0} />
                    <motion.h2 className="section-title" variants={fadeSlideLeft} custom={0}>
                        Experience
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeSlideLeft} custom={1}>
                        Where I've worked and what I've built.
                    </motion.p>

                    <div className="timeline">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                className="timeline-item"
                                variants={fadeSlideLeft}
                                custom={2 + i}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        alignItems: "baseline",
                                        gap: "0.5rem",
                                        marginBottom: "0.35rem",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        {exp.role}
                                    </h3>
                                    <span
                                        style={{
                                            fontSize: "0.8rem",
                                            color: "var(--text-muted)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {exp.period}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        color: "var(--accent-warm)",
                                        marginBottom: "0.4rem",
                                    }}
                                >
                                    {exp.company}
                                </p>
                                <p
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "0.9rem",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {exp.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "../data";


const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};

const pillReveal = {
    hidden: { opacity: 0, scale: 0.85, y: 15 },
    visible: (i = 0) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.04,
            duration: 0.45,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};

export default function Skills() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section id="skills" className="section" ref={ref}>
            <div className="warm-blob warm-blob-2" />

            <motion.div className="section-inner" style={{ y: parallaxY }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.hr className="section-divider" variants={fadeUp} custom={0} />
                    <motion.h2 className="section-title" variants={fadeUp} custom={0}>
                        Skills
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={1}>
                        Technologies and tools in my toolkit.
                    </motion.p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "2rem",
                        }}
                    >
                        {skillCategories.map((cat, ci) => (
                            <motion.div
                                key={ci}
                                variants={fadeUp}
                                custom={2 + ci}
                                className="glass-card"
                                style={{ padding: "2rem" }}
                            >
                                {/* Category header */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.6rem",
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    <span className="skill-category-label" style={{ marginBottom: 0 }}>
                                        {cat.category}
                                    </span>
                                </div>

                                {/* Skill pills */}
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "0.6rem",
                                    }}
                                >
                                    {cat.skills.map((skill, si) => (
                                        <motion.span
                                            key={skill}
                                            className="skill-pill"
                                            variants={pillReveal}
                                            custom={si}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

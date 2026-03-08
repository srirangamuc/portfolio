import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { projects } from "../data";

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.7,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};

export default function Projects() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section id="projects" className="section" ref={ref}>
            <div className="warm-blob warm-blob-1" />

            <motion.div className="section-inner" style={{ y: parallaxY }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <motion.hr className="section-divider" variants={fadeUp} custom={0} />
                    <motion.h2 className="section-title" variants={fadeUp} custom={0}>
                        Projects
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={1}>
                        Things I've built and shipped.
                    </motion.p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {projects.map((project, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                custom={2 + i}
                                className="glass-card"
                                style={{
                                    padding: "2rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.75rem",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "1.25rem",
                                            fontWeight: 700,
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        {project.name}
                                    </h3>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            color: "var(--text-muted)",
                                            fontSize: "1rem",
                                            transition: "color 0.2s",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                                        aria-label={`${project.name} link`}
                                    >
                                        {project.linkLabel === "GitHub" ? <FiGithub /> : <FiExternalLink />}
                                    </a>
                                </div>

                                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                                    {project.description}
                                </p>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto", paddingTop: "0.5rem" }}>
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            style={{
                                                fontSize: "0.75rem",
                                                fontWeight: 500,
                                                padding: "0.25rem 0.7rem",
                                                borderRadius: 999,
                                                background: "rgba(0,0,0,0.04)",
                                                border: "1px solid rgba(0,0,0,0.06)",
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

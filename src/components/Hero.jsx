import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personalInfo } from "../data";
import { DotPattern } from "./ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Hero() {
    return (
        <section id="hero" className="section" style={{ position: "relative" }}>
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                )}
            />

            <div className="section-inner" style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
                {/* Small intro */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        marginBottom: "1.5rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                    }}
                >
                    Hello, I'm
                </motion.p>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                    style={{
                        fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: "-0.04em",
                        marginBottom: "1.5rem",
                        color: "var(--text-primary)",
                    }}
                >
                    {personalInfo.name}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
                    style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                        color: "var(--text-secondary)",
                        maxWidth: 550,
                        margin: "0 auto 3rem",
                        lineHeight: 1.6,
                    }}
                >
                    {personalInfo.tagline}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.95, ease: [0.25, 0.8, 0.25, 1] }}
                    style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginBottom: "4rem",
                    }}
                >
                    <a href="#contact" className="btn-primary">
                        <FiMail /> Get in Touch
                    </a>
                    <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline"
                    >
                        <FiGithub /> GitHub
                    </a>
                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline"
                    >
                        <FiLinkedin /> LinkedIn
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="scroll-indicator"
                    style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}
                >
                    <a href="#about" aria-label="Scroll down">
                        <HiArrowDown />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

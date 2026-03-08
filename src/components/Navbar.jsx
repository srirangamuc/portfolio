import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { personalInfo } from "../data";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Blogs", href: "#blogs" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLinkClick = () => setMobileOpen(false);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-backdrop" : ""
                    }`}
                style={{ padding: scrolled ? "0.75rem 1.5rem" : "1.5rem 1.5rem" }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <a
                        href="#hero"
                        style={{
                            fontSize: "1.1rem",
                            fontFamily: "var(--font-heading)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--text-primary)",
                        }}
                    >
                        {personalInfo.name.split(" ")[0]}
                    </a>

                    {/* Desktop links */}
                    <div
                        style={{ display: "flex", gap: "2rem", alignItems: "center" }}
                        className="desktop-nav"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: "0.85rem",
                                    fontWeight: 500,
                                    color: "var(--text-muted)",
                                    transition: "color 0.25s ease",
                                }}
                                onMouseEnter={(e) =>
                                    (e.target.style.color = "var(--text-primary)")
                                }
                                onMouseLeave={(e) =>
                                    (e.target.style.color = "var(--text-muted)")
                                }
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="mobile-nav-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                        style={{
                            display: "none",
                            background: "none",
                            border: "none",
                            color: "var(--text-primary)",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                        }}
                    >
                        {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mobile-menu-overlay"
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 40,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "2rem",
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={handleLinkClick}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06, ease: [0.25, 0.8, 0.25, 1] }}
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
        </>
    );
}

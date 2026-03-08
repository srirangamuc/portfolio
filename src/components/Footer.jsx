import { FiGithub, FiLinkedin } from "react-icons/fi";
import { personalInfo } from "../data";

export default function Footer() {
    return (
        <footer
            style={{
                padding: "2rem 1.5rem",
                textAlign: "center",
                borderTop: "1px solid var(--border-color)",
                color: "var(--text-muted)",
                fontSize: "0.8rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1.25rem",
                    marginBottom: "0.75rem",
                    fontSize: "1rem",
                }}
            >
                <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                    <FiGithub />
                </a>
                <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                    <FiLinkedin />
                </a>
            </div>
            <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </footer>
    );
}

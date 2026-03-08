import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// Fallback data shown when Strapi is unreachable
const fallbackBlogs = [
    {
        title: "Building a RAG Pipeline with Fine-Tuned T5",
        summary:
            "A deep dive into how I engineered a Retrieval-Augmented Generation pipeline for purchase order summarization using a fine-tuned T5 model.",
        tag: "AI / NLP",
        emoji: "🤖",
        date: "2025-01-15",
        link: "#",
        cover: null,
        slug: "building-a-rag-pipeline-with-fine-tuned-t5",
    },
    {
        title: "Self-Hosting S3 with Go, MinIO & Postgres",
        summary:
            "Why I built SBucket — a self-hosted, S3-compatible object store — and the architecture decisions behind it.",
        tag: "Systems",
        emoji: "🪣",
        date: "2024-12-10",
        link: "https://github.com/code-cults/sbucket",
        cover: null,
        slug: "self-hosting-s3-with-go-minio-postgres",
    },
    {
        title: "Federated Learning for Medical VQA",
        summary:
            "Exploring privacy-preserving ML through federated learning applied to domain-adapted Visual Question Answering in pathology.",
        tag: "Research",
        emoji: "🔬",
        date: "2024-10-20",
        link: "#",
        cover: null,
        slug: "federated-learning-for-medical-vqa",
    },
];

/**
 * Transform Strapi API response to our blog format.
 */
function transformStrapiBlog(item) {
    const attrs = item;
    const coverUrl = attrs.cover?.url
        ? attrs.cover.url.startsWith("http")
            ? attrs.cover.url
            : `${STRAPI_URL}${attrs.cover.url}`
        : null;

    return {
        title: attrs.title,
        summary: attrs.summary,
        tag: attrs.tag,
        emoji: attrs.emoji || "📝",
        date: attrs.date,
        link: attrs.link || "#",
        cover: coverUrl,
        slug: attrs.slug,
    };
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

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

export default function Blogs() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch(
                    `${STRAPI_URL}/api/blogs?populate=cover&sort=date:desc&status=published`
                );
                if (!res.ok) throw new Error("API error");
                const json = await res.json();
                const items = (json.data || []).map(transformStrapiBlog);
                setBlogs(items.length > 0 ? items : fallbackBlogs);
            } catch {
                // Strapi not running or unreachable — use fallback
                setBlogs(fallbackBlogs);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <section id="blogs" className="section" ref={ref}>
            <div className="warm-blob warm-blob-3" />

            <motion.div className="section-inner" style={{ y: parallaxY }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <motion.hr className="section-divider" variants={fadeUp} custom={0} />
                    <motion.h2 className="section-title" variants={fadeUp} custom={0}>
                        Blogs & Writing
                    </motion.h2>
                    <motion.p className="section-subtitle" variants={fadeUp} custom={1}>
                        Exploring ideas through words.
                    </motion.p>

                    {loading ? (
                        /* Skeleton loader */
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: "1.5rem",
                            }}
                        >
                            {[1, 2, 3].map((n) => (
                                <div
                                    key={n}
                                    className="blog-card"
                                    style={{ opacity: 0.5 }}
                                >
                                    <div
                                        className="blog-card-banner"
                                        style={{
                                            background: "var(--bg-secondary)",
                                            animation: "pulse 1.5s ease-in-out infinite",
                                        }}
                                    />
                                    <div style={{ padding: "1.5rem" }}>
                                        <div
                                            style={{
                                                height: 12,
                                                width: "60%",
                                                background: "rgba(0,0,0,0.06)",
                                                borderRadius: 6,
                                                marginBottom: "0.75rem",
                                            }}
                                        />
                                        <div
                                            style={{
                                                height: 10,
                                                width: "90%",
                                                background: "rgba(0,0,0,0.04)",
                                                borderRadius: 6,
                                                marginBottom: "0.5rem",
                                            }}
                                        />
                                        <div
                                            style={{
                                                height: 10,
                                                width: "70%",
                                                background: "rgba(0,0,0,0.04)",
                                                borderRadius: 6,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: "1.5rem",
                            }}
                        >
                            {blogs.map((blog, i) => {
                                const cardContent = (
                                    <>
                                        {/* Banner — cover image or emoji fallback */}
                                        {blog.cover ? (
                                            <div
                                                style={{
                                                    height: 180,
                                                    backgroundImage: `url(${blog.cover})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    borderRadius: "16px 16px 0 0",
                                                }}
                                            />
                                        ) : (
                                            <div className="blog-card-banner">
                                                <span>{blog.emoji}</span>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div
                                            style={{
                                                padding: "1.5rem",
                                                flex: 1,
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
                                                <span className="blog-tag">{blog.tag}</span>
                                                <span
                                                    style={{
                                                        fontSize: "0.75rem",
                                                        color: "var(--text-muted)",
                                                    }}
                                                >
                                                    {formatDate(blog.date)}
                                                </span>
                                            </div>

                                            <h3
                                                style={{
                                                    fontSize: "1.1rem",
                                                    fontWeight: 700,
                                                    color: "var(--text-primary)",
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {blog.title}
                                            </h3>

                                            <p
                                                style={{
                                                    fontSize: "0.85rem",
                                                    color: "var(--text-secondary)",
                                                    lineHeight: 1.7,
                                                    flex: 1,
                                                }}
                                            >
                                                {blog.summary}
                                            </p>

                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "0.3rem",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 600,
                                                    color: "var(--text-primary)",
                                                    marginTop: "0.5rem",
                                                }}
                                            >
                                                Read more <FiArrowUpRight />
                                            </span>
                                        </div>
                                    </>
                                );

                                // Use React Router Link for internal blog posts
                                return blog.slug ? (
                                    <motion.div
                                        key={blog.slug}
                                        variants={fadeUp}
                                        custom={2 + i}
                                    >
                                        <Link
                                            to={`/blog/${blog.slug}`}
                                            className="blog-card"
                                            style={{
                                                textDecoration: "none",
                                                display: "flex",
                                                flexDirection: "column",
                                                height: "100%",
                                            }}
                                        >
                                            {cardContent}
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <motion.a
                                        key={i}
                                        href={blog.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        variants={fadeUp}
                                        custom={2 + i}
                                        className="blog-card"
                                        style={{
                                            textDecoration: "none",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {cardContent}
                                    </motion.a>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </motion.div>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
        </section>
    );
}

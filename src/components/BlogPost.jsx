import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export default function BlogPost() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await fetch(
                    `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=cover&status=published`
                );
                if (!res.ok) throw new Error("API error");
                const json = await res.json();
                const item = json.data?.[0];
                if (!item) throw new Error("Not found");

                const attrs = item;
                const coverUrl = attrs.cover?.url
                    ? attrs.cover.url.startsWith("http")
                        ? attrs.cover.url
                        : `${STRAPI_URL}${attrs.cover.url}`
                    : null;

                setBlog({
                    title: attrs.title,
                    summary: attrs.summary,
                    tag: attrs.tag,
                    emoji: attrs.emoji || "📝",
                    date: attrs.date,
                    link: attrs.link,
                    cover: coverUrl,
                    body: attrs.body,
                });
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg-primary)",
                }}
            >
                <div
                    style={{
                        width: 32,
                        height: 32,
                        border: "3px solid rgba(0,0,0,0.08)",
                        borderTopColor: "var(--text-primary)",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                    }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.5rem",
                    background: "var(--bg-primary)",
                    padding: "2rem",
                }}
            >
                <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}>
                    Blog post not found.
                </p>
                <Link to="/" className="btn-primary">
                    <FiArrowLeft /> Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
            {/* Navigation bar */}
            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    padding: "1rem 1.5rem",
                    background: "rgba(250, 250, 248, 0.85)",
                    backdropFilter: "blur(16px)",
                    borderBottom: "1px solid var(--border-color)",
                }}
            >
                <div
                    style={{
                        maxWidth: 780,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                        }}
                    >
                        <FiArrowLeft /> Back
                    </Link>

                    {blog.link && blog.link !== "#" && (
                        <a
                            href={blog.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                color: "var(--text-muted)",
                            }}
                        >
                            Source <FiExternalLink />
                        </a>
                    )}
                </div>
            </nav>

            {/* Cover image */}
            {blog.cover && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        maxWidth: 780,
                        margin: "0 auto",
                        padding: "2rem 1.5rem 0",
                    }}
                >
                    <img
                        src={blog.cover}
                        alt={blog.title}
                        style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 400,
                            objectFit: "cover",
                            borderRadius: 16,
                        }}
                    />
                </motion.div>
            )}

            {/* Article content */}
            <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
                style={{
                    maxWidth: 780,
                    margin: "0 auto",
                    padding: "2.5rem 1.5rem 5rem",
                }}
            >
                {/* Meta */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "1.25rem",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "var(--font-accent)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            padding: "0.3rem 0.75rem",
                            borderRadius: 999,
                            background: "rgba(0, 0, 0, 0.04)",
                            color: "var(--text-muted)",
                        }}
                    >
                        {blog.tag}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        {formatDate(blog.date)}
                    </span>
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.2,
                        color: "var(--text-primary)",
                        marginBottom: "1.25rem",
                    }}
                >
                    {blog.title}
                </h1>

                {/* Summary */}
                <p
                    style={{
                        fontSize: "1.15rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        marginBottom: "2.5rem",
                        borderLeft: "3px solid var(--accent-warm)",
                        paddingLeft: "1rem",
                    }}
                >
                    {blog.summary}
                </p>

                {/* Body (rich text) */}
                {blog.body && (
                    <div
                        className="blog-body"
                        dangerouslySetInnerHTML={{ __html: blog.body }}
                    />
                )}

                {/* No body fallback */}
                {!blog.body && (
                    <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                        Full article coming soon.
                    </p>
                )}
            </motion.article>

            {/* Blog body typography */}
            <style>{`
        .blog-body {
          font-size: 1.05rem;
          line-height: 1.85;
          color: var(--text-secondary);
        }
        .blog-body h1, .blog-body h2, .blog-body h3 {
          font-family: var(--font-heading);
          color: var(--text-primary);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
          line-height: 1.3;
        }
        .blog-body h2 { font-size: 1.5rem; }
        .blog-body h3 { font-size: 1.2rem; }
        .blog-body p { margin-bottom: 1.25rem; }
        .blog-body ul, .blog-body ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .blog-body li { margin-bottom: 0.5rem; }
        .blog-body code {
          font-size: 0.9em;
          background: rgba(0,0,0,0.04);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }
        .blog-body pre {
          background: #1a1a1a;
          color: #e8e8ef;
          padding: 1.25rem;
          border-radius: 12px;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .blog-body pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .blog-body blockquote {
          border-left: 3px solid var(--accent-warm);
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: var(--text-muted);
          font-style: italic;
        }
        .blog-body img {
          max-width: 100%;
          border-radius: 12px;
          margin: 1.5rem 0;
        }
        .blog-body a {
          color: var(--text-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
        </div>
    );
}

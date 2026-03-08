import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Decorative gradient rings that animate on scroll.
 * Placed at the top and bottom of the page.
 */
export default function GradientRings() {
    const { scrollYProgress } = useScroll();

    // Top rings — grow and rotate as you scroll down
    const topRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const topScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1.15]);
    const topOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0.25, 0.5, 0.08]);

    // Bottom rings — grow and rotate as you approach the bottom
    const bottomRotate = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const bottomScale = useTransform(scrollYProgress, [0.6, 1], [0.8, 1.2]);
    const bottomOpacity = useTransform(scrollYProgress, [0.5, 0.8, 1], [0.05, 0.4, 0.3]);

    const ringStyle = {
        position: "fixed",
        pointerEvents: "none",
        zIndex: 0,
    };

    return (
        <>
            {/* ── Top-right ring cluster ── */}
            <motion.div
                style={{
                    ...ringStyle,
                    top: -180,
                    right: -180,
                    width: 520,
                    height: 520,
                    rotate: topRotate,
                    scale: topScale,
                    opacity: topOpacity,
                }}
            >
                <svg width="520" height="520" viewBox="0 0 520 520" fill="none">
                    <circle
                        cx="260"
                        cy="260"
                        r="200"
                        stroke="url(#topGrad1)"
                        strokeWidth="1.2"
                        fill="none"
                    />
                    <circle
                        cx="260"
                        cy="260"
                        r="240"
                        stroke="url(#topGrad2)"
                        strokeWidth="0.8"
                        fill="none"
                        strokeDasharray="8 12"
                    />
                    <circle
                        cx="260"
                        cy="260"
                        r="155"
                        stroke="url(#topGrad3)"
                        strokeWidth="0.6"
                        fill="none"
                    />
                    <defs>
                        <linearGradient id="topGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C4A882" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#D4C4B0" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="topGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#B8977E" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#E8D5C0" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="topGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#D4C4B0" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#C4A882" stopOpacity="0.08" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* ── Top-left smaller ring ── */}
            <motion.div
                style={{
                    ...ringStyle,
                    top: 60,
                    left: -120,
                    width: 320,
                    height: 320,
                    rotate: useTransform(scrollYProgress, [0, 1], [0, -120]),
                    scale: topScale,
                    opacity: useTransform(scrollYProgress, [0, 0.2, 0.5], [0.15, 0.35, 0.04]),
                }}
            >
                <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
                    <circle
                        cx="160"
                        cy="160"
                        r="130"
                        stroke="url(#topLeftGrad)"
                        strokeWidth="0.8"
                        fill="none"
                    />
                    <circle
                        cx="160"
                        cy="160"
                        r="100"
                        stroke="url(#topLeftGrad2)"
                        strokeWidth="0.5"
                        fill="none"
                        strokeDasharray="4 10"
                    />
                    <defs>
                        <linearGradient id="topLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E8D5C0" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#C4A882" stopOpacity="0.08" />
                        </linearGradient>
                        <linearGradient id="topLeftGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#D4C4B0" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#B8977E" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* ── Bottom-left ring cluster ── */}
            <motion.div
                style={{
                    ...ringStyle,
                    bottom: -200,
                    left: -160,
                    width: 560,
                    height: 560,
                    rotate: bottomRotate,
                    scale: bottomScale,
                    opacity: bottomOpacity,
                }}
            >
                <svg width="560" height="560" viewBox="0 0 560 560" fill="none">
                    <circle
                        cx="280"
                        cy="280"
                        r="220"
                        stroke="url(#btmGrad1)"
                        strokeWidth="1"
                        fill="none"
                    />
                    <circle
                        cx="280"
                        cy="280"
                        r="260"
                        stroke="url(#btmGrad2)"
                        strokeWidth="0.7"
                        fill="none"
                        strokeDasharray="6 14"
                    />
                    <circle
                        cx="280"
                        cy="280"
                        r="170"
                        stroke="url(#btmGrad3)"
                        strokeWidth="0.5"
                        fill="none"
                    />
                    <defs>
                        <linearGradient id="btmGrad1" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#C4A882" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#D4C4B0" stopOpacity="0.08" />
                        </linearGradient>
                        <linearGradient id="btmGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#B8977E" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#E8D5C0" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="btmGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#D4C4B0" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#C4A882" stopOpacity="0.06" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* ── Bottom-right smaller ring ── */}
            <motion.div
                style={{
                    ...ringStyle,
                    bottom: 40,
                    right: -100,
                    width: 300,
                    height: 300,
                    rotate: useTransform(scrollYProgress, [0, 1], [0, 150]),
                    scale: bottomScale,
                    opacity: useTransform(scrollYProgress, [0.6, 0.85, 1], [0.05, 0.3, 0.2]),
                }}
            >
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
                    <circle
                        cx="150"
                        cy="150"
                        r="120"
                        stroke="url(#btmRightGrad)"
                        strokeWidth="0.7"
                        fill="none"
                    />
                    <circle
                        cx="150"
                        cy="150"
                        r="90"
                        stroke="url(#btmRightGrad2)"
                        strokeWidth="0.5"
                        fill="none"
                        strokeDasharray="5 8"
                    />
                    <defs>
                        <linearGradient id="btmRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E8D5C0" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#B8977E" stopOpacity="0.06" />
                        </linearGradient>
                        <linearGradient id="btmRightGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#C4A882" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#D4C4B0" stopOpacity="0.04" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>
        </>
    );
}

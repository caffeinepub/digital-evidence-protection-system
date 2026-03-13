import { motion } from "motion/react";

interface CharSplitHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

function getGraphemeClusters(text: string): string[] {
  try {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return [...segmenter.segment(text)].map((s) => s.segment);
  } catch {
    return [...text];
  }
}

export default function CharSplitHeading({
  text,
  className,
  style,
}: CharSplitHeadingProps) {
  const chars = getGraphemeClusters(text).map((char, i) => ({
    char,
    key: `char-pos-${i}`,
  }));

  return (
    <motion.span
      key={text}
      className={className}
      style={{ display: "inline-block", ...style }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.03 },
        },
      }}
    >
      {chars.map(({ char, key }) => (
        <motion.span
          key={key}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.35, ease: "easeOut" },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import tw from "twin.macro";

export interface AnimatedTextProps {
  text: string;
  size: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, size }) => {
  return (
    <div css={[tw`relative inline-block overflow-hidden`, { height: size, width: size }]}>
      <AnimatePresence>
        <motion.span
          key={text}
          initial={{
            y: -20,
            position: "absolute",
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: 20,
            position: "absolute",
          }}
          css={{
            fontSize: size,
          }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedText;

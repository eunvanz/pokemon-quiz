import { AnimatePresence, motion } from "framer-motion";
import tw from "twin.macro";

export interface ComboProps {
  count?: number;
}

const Combo: React.FC<ComboProps> = ({ count }) => {
  return !!count && count > 1 ? (
    <div>
      <AnimatePresence>
        <motion.span
          css={tw`text-3xl text-blue-600 absolute`}
          key={count}
          initial={{
            scale: 3,
          }}
          animate={{
            scale: 1,
            opacity: 0,
          }}
          transition={{
            ease: "linear",
            duration: 0.2,
          }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <span css={tw`text-3xl text-blue-600`}>{count}</span>
      <span css={tw`text-lg`}>combos</span>
    </div>
  ) : null;
};

export default Combo;

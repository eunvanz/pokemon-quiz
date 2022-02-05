import { AnimatePresence, motion } from "framer-motion";
import tw from "twin.macro";

export interface TargetMonProps {
  monImage?: string;
  nextMonImage?: string;
}

const TargetMon: React.FC<TargetMonProps> = ({ monImage, nextMonImage }) => {
  return (
    <div css={tw`w-40 h-40 overflow-hidden relative`}>
      {/* for caching */}
      {nextMonImage && <img src={nextMonImage} alt="cache" css={tw`hidden`} />}
      {monImage && (
        <AnimatePresence>
          <motion.img
            initial={{
              y: -200,
              position: "absolute",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: 200,
              position: "absolute",
            }}
            key={monImage}
            src={monImage}
            alt="target"
            width="100%"
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export default TargetMon;

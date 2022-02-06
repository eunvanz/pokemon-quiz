import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { uniq } from "lodash-es";
import tw from "twin.macro";

export interface TargetMonProps {
  monImage?: string;
  nextMonImage?: string;
  monNames?: string;
}

const TargetMon: React.FC<TargetMonProps> = ({ monImage, nextMonImage, monNames }) => {
  const splitMonNames = useMemo(() => {
    return uniq(monNames?.split(","));
  }, [monNames]);

  return (
    <div css={tw`flex`}>
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
      {splitMonNames && (
        <div css={tw`relative ml-4`}>
          <AnimatePresence>
            <motion.div
              initial={{
                opacity: 0,
                position: "absolute",
              }}
              animate={{
                opacity: 1,
                position: "relative",
              }}
              exit={{
                opacity: 0,
                position: "absolute",
              }}
            >
              {splitMonNames.map((name) => (
                <div>{name}</div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TargetMon;

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import tw from "twin.macro";
import Intro from "../Intro";
import SelectGeneration, { SelectGenerationProps } from "../SelectGeneration";

export interface MainProps extends SelectGenerationProps {}

const Main: React.FC<MainProps> = ({ mons, ...restProps }) => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  return (
    <AnimatePresence>
      {isIntroVisible ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, position: "absolute", width: "100%" }}
        >
          <Intro mons={mons} onEnter={() => setIsIntroVisible(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="select-generation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SelectGeneration mons={mons} {...restProps} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Main;

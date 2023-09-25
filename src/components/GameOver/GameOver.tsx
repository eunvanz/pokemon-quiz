import { AnimatePresence, motion } from "framer-motion";
import tw from "twin.macro";
import Button from "../Button";

export interface GameOverProps {
  isVisible: boolean;
  onHide: VoidFunction;
}

const GameOver: React.FC<GameOverProps> = ({ isVisible, onHide }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              opacity: {
                delay: 0.3,
              },
            },
          }}
          css={tw`absolute flex justify-center items-center w-full h-full flex-col z-10 top-0`}
        >
          <motion.h1
            initial={{
              y: -100,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: 100,
              transition: {
                y: {
                  delay: 0.3,
                },
              },
            }}
            css={tw`text-blue-600 text-6xl z-10`}
          >
            GAME OVER
          </motion.h1>
          <motion.div
            css={tw`mt-3 z-10`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                opacity: {
                  delay: 0.3,
                },
              },
            }}
            exit={{
              opacity: 0,
            }}
          >
            <Button variant="outlined" onClick={onHide}>
              Check the wrong answers
            </Button>
          </motion.div>
          <div css={tw`absolute bg-white w-full h-full opacity-80 z-0`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOver;

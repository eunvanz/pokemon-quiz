import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useMemo,
} from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import tw from "twin.macro";
import { motionVariants } from "~/helpers/framer";

export interface TextFieldProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isBlock?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ isBlock, hasError, errorMessage, ...props }, ref) => {
    const animation = useAnimation();

    const cssByIsBlock = useMemo(() => {
      if (isBlock) {
        return tw`block w-full`;
      }
      return undefined;
    }, [isBlock]);

    const cssByErrorMessage = useMemo(() => {
      if (hasError) {
        return tw`border-red-500!`;
      }
      return undefined;
    }, [hasError]);

    useEffect(() => {
      if (hasError) {
        animation.start("vibe");
      }
    }, [hasError, errorMessage]);

    return (
      <motion.div
        css={tw`flex flex-col items-start`}
        animate={animation}
        variants={motionVariants}
      >
        <input
          ref={ref}
          css={[
            tw`
              p-3 border-2 border-solid rounded-xl border-gray-200 transition-all text-base outline-none
            `,
            {
              "&:hover": props.disabled ? undefined : tw`border-gray-400`,
            },
            {
              "&:focus-visible": tw`border-2 border-blue-500`,
            },
            {
              "&::placeholder": tw`text-gray-400`,
            },
            {
              "&[disabled]": tw`bg-gray-200 cursor-not-allowed`,
            },
            cssByIsBlock,
            cssByErrorMessage,
          ]}
          {...props}
        />
        <div
          css={[
            tw`transition-all text-red-500 text-left overflow-hidden text-sm pl-2`,
            hasError && errorMessage ? tw`h-5` : tw`h-0`,
          ]}
        >
          {errorMessage || ""}
        </div>
      </motion.div>
    );
  },
);

export default TextField;

import { DetailedHTMLProps, InputHTMLAttributes, useMemo } from "react";
import tw from "twin.macro";

export interface TextFieldProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isBlock: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ isBlock, ...props }) => {
  const cssByIsBlock = useMemo(() => {
    if (isBlock) {
      return tw`block w-full`;
    }
    return undefined;
  }, [isBlock]);

  return (
    <input
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
      ]}
      {...props}
    />
  );
};

export default TextField;

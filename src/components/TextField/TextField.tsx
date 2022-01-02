import { DetailedHTMLProps, InputHTMLAttributes, useMemo } from "react";
import { colors } from "~/styles/colors";

export interface TextFieldProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isBlock: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ isBlock, ...props }) => {
  const cssByIsBlock = useMemo(() => {
    if (isBlock) {
      return {
        display: "block",
        width: "100%",
      };
    }
    return undefined;
  }, [isBlock]);

  return (
    <input
      css={{
        padding: "1rem",
        border: "none",
        borderColor: colors.lightGray,
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 16,
        transition: "all 200ms linear",
        fontSize: "1rem",
        ...cssByIsBlock,
        "&:hover": {
          borderColor: props.disabled ? undefined : colors.gray,
        },
        "&:focus-visible": {
          outline: "none",
          borderWidth: 3,
          borderColor: colors.primary,
        },
        "&::placeholder": {
          color: colors.gray,
        },
        "&[disabled]": {
          backgroundColor: colors.lightGray,
          cursor: "not-allowed",
        },
      }}
      {...props}
    />
  );
};

export default TextField;

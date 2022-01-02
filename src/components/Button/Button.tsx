import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from "react";
import tw from "twin.macro";

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "contained" | "outlined";
}

const Button: React.FC<ButtonProps> = ({ variant = "contained", ...props }) => {
  const cssByColor = useMemo(() => {
    switch (variant) {
      case "contained":
        return tw`bg-blue-500 text-white border-blue-500`;
      case "outlined":
        return tw`bg-white text-blue-500 border-blue-500`;
    }
  }, [variant]);

  const cssByDisabled = useMemo(() => {
    if (!props.disabled) {
      return {
        "&:hover": {
          boxShadow: "0px 3px 4px 0px rgba(0,0,0,0.2)",
          transform: "translateY(-1px)",
        },
        "&:active": {
          boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.2)",
          transform: "translateY(1px)",
        },
      };
    }
    return tw`opacity-50`;
  }, [props.disabled]);

  return (
    <button
      css={[
        tw`
          p-3 border-2 border-solid rounded-xl shadow-sm text-blue-500 transition-all text-base
        `,
        {
          boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.2)",
        },
        cssByColor,
        cssByDisabled,
      ]}
      {...props}
    />
  );
};

export default Button;

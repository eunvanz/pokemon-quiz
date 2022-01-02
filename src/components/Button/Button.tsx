import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from "react";
import tw from "twin.macro";

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  color = "primary",
  ...props
}) => {
  const cssByVariant = useMemo(() => {
    switch (variant) {
      case "contained":
        return color === "primary"
          ? tw`bg-primary text-white border-primary`
          : tw`bg-secondary text-white border-secondary`;
      case "outlined":
        return color === "primary"
          ? tw`bg-white text-primary border-primary`
          : tw`bg-white text-secondary border-secondary`;
    }
  }, [variant, color]);

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
          p-3 border-2 border-solid rounded-xl shadow-sm text-primary transition-all text-base
        `,
        {
          boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.2)",
        },
        cssByVariant,
        cssByDisabled,
      ]}
      {...props}
    />
  );
};

export default Button;

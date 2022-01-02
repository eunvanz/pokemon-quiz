import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from "react";
import "twin.macro";
import { colors } from "~/styles/colors";

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "contained" | "outlined";
}

const Button: React.FC<ButtonProps> = ({ variant = "contained", ...props }) => {
  const cssByColor = useMemo(() => {
    switch (variant) {
      case "contained":
        return {
          backgroundColor: colors.primary,
          color: colors.white,
          borderColor: colors.primary,
        };
      case "outlined":
        return {
          backgroundColor: colors.white,
          color: colors.primary,
          borderColor: colors.primary,
        };
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
    return undefined;
  }, [props.disabled]);

  return (
    <button
      css={{
        padding: "1rem",
        borderWidth: 3,
        borderStyle: "solid",
        fontSize: "1rem",
        borderRadius: 16,
        boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.2)",
        transition: "all 100ms linear",
        opacity: props.disabled ? "50%" : undefined,
        ...cssByColor,
        ...cssByDisabled,
      }}
      {...props}
    />
  );
};

export default Button;

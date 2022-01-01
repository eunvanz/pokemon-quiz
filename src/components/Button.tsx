import { colors } from "~/styles/colors";

export interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button
      css={{
        backgroundColor: colors.white,
        color: colors.primary,
        padding: 16,
        border: "2px solid",
        borderColor: colors.primary,
        borderRadius: 16,
      }}
    >
      {label}
    </button>
  );
};

export default Button;

import styled from "@emotion/styled";

const ButtonRoot = styled.button`
  padding: 32px;
  border-radius: 4px;
  color: white;
`;

export interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return <></>;
};

export default Button;

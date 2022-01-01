import { css, Global } from "@emotion/react";

const GlobalStyle: React.FC = () => {
  return (
    <Global
      styles={css`
        button,
        [role="button"] {
          cursor: pointer;
          &[disabled] {
            cursor: not-allowed;
          }
        }
      `}
    />
  );
};

export default GlobalStyle;

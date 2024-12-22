import { css } from '@linaria/core';

const footerContainer = css`
  width: 100%;
  padding: 1rem;
//   background-color: #f8f9fa;
  text-align: center;
  font-size: 1rem;
  color: #6c757d;
  position: fixed;
  bottom: 0;
`;

export const Footer = () => {
  return (
    <footer className={footerContainer}>
      "<i>Horsenome</i>" Made with ❤️
    </footer>
  );
};

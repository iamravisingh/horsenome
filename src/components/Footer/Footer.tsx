import { css } from "@linaria/core";

const footerContainer = css`
  width: 100%;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  color: #6c757d;
  position: fixed;
  bottom: 0;
  background-color: #f8f9fa; /* Light background for better readability */
  border-top: 1px solid #e9ecef; /* Subtle border for separation */
  
`;

const descriptionText = css`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #495057;
`;

export const Footer = () => {
  return (
    <footer className={footerContainer}>
      "<i>Horsenome</i>" Made with ❤️
      <div className={descriptionText}>
        Horsenome brings the rhythm of nature into music, inspired by the steady
        gallop of a horse 🐎 and the resonant beats of the dholak's thappi. Feel
        the rhythm, embrace the melody, and let your creativity flow!
      </div>
    </footer>
  );
};

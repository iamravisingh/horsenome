import { css } from "@linaria/core";

const footerContainer = css`
 width: 100%;
 display: flex; 
`

export const Footer = () => {
    return (
        <div className={footerContainer}>
            footer
        </div>
    )
}
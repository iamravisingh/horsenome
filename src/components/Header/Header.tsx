import { css } from "@linaria/core";

const headerContainer = css`
    width: 100%;
    display: flex;
`
export const Header = () => {
    return (
        <header className={headerContainer}>
            Horsenome
        </header>
    )
}
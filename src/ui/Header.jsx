import styled from "styled-components";

const StyleHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-radius: 1px solid var(--color-green-100);
`;

function Header() {
  return <StyleHeader>Header</StyleHeader>;
}

export default Header;

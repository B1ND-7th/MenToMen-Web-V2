import styled from "styled-components";
import flex from "./flex";

export const ListContainer = styled.div`
  width: 100%;
  height: 100%;

  padding-top: 1rem;
  padding-left: 6rem;
  padding-bottom: 3rem;

  ${flex({ justifyContent: "center" })}
  flex-wrap: wrap;
`;

export const ListWrapper = styled.div`
  ${flex({ alignItems: "center", flexDirection: "column", rowGap: "10px" })}
`;

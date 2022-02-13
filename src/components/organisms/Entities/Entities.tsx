import React from "react";
import styled from "styled-components";

interface Props {
  entities: string[];
}

export const Entities: React.FC<Props> = ({ entities }) => {
  return (
    <StyledContainer>
      <>
        <h3>Browsers</h3>
        <BlankRow></BlankRow>
        {entities.map((entity: string, index: number) => (
          <div key={index}>{entity}</div>
        ))}
      </>
    </StyledContainer>
  );
};

const StyledContainer = styled.div``;
export const BlankRow = styled.div`
  height: 21.34px;
`;

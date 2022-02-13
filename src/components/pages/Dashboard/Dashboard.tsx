import React from "react";
import { Entities } from "../../organisms/Entities/Entities";
import { SubEntities } from "../../organisms/SubEntities/SubEntities";
import styled from "styled-components";
import { Config, SubEntityData } from "../../../schemas/schemas";

interface Data {
  entities: string[];
  subEntities: SubEntityData[];
}

interface Props {
  data: Data;
  colConfig: Config[];
}

export const Dashboard: React.FC<Props> = ({ data, colConfig }) => {
  const numberOfVisibleSubEntities = colConfig?.filter(
    (cfg: Config) => !cfg.isHidden
  )?.length;

  return (
    <StyledContainer visibleItems={numberOfVisibleSubEntities}>
      <>
        <Entities entities={data.entities}></Entities>
        {data.subEntities?.map((subEntity: SubEntityData, index: number) => {
          const config = colConfig?.find(
            (cfg: Config) => cfg.key === subEntity.id
          );

          if (config?.isHidden) {
            return;
          }

          return (
            <SubEntities
              key={index}
              subEntity={subEntity}
              config={config}
            ></SubEntities>
          );
        })}
      </>
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{
  visibleItems: number;
}>`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.visibleItems + 1}, 1fr);`};
  grid-column-gap: 20px;

  @media (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: ${(props) => `repeat(${props.visibleItems}, 1fr);`};
  }

  @media(max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);};
  }
`;

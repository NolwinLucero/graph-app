import React from "react";
import styled from "styled-components";
import { numberFormatter } from "../../../utils/utils";
import { Config, SubEntityData } from "../../../schemas/schemas";

interface Props {
  subEntity: SubEntityData;
  config?: Config;
}

export const SubEntities: React.FC<Props> = ({ subEntity, config }) => {
  console.log("subEntity", JSON.stringify(subEntity));
  console.log("config", JSON.stringify(config));
  const [min, max] = subEntity.entityDetails.reduce(
    (
      [prevMin, prevMax]: number[],
      {
        value,
      }: {
        browser: string;
        value: number;
      }
    ) => [Math.min(prevMin, value), Math.max(prevMax, value)],
    [Infinity, -Infinity]
  );

  return (
    <StyledContainer>
      <h3>{subEntity.header}</h3>
      <StyledSubEntityParent>
        {config?.showPlot && (
          <>
            <StyledSubHeaderChild1>
              {numberFormatter(min)}
              {subEntity.header === "Fill rate" ? "%" : ""}
            </StyledSubHeaderChild1>
            <StyledSubHeaderChild2>
              {numberFormatter(max)}
              {subEntity.header === "Fill rate" ? "%" : ""}
            </StyledSubHeaderChild2>
          </>
        )}
      </StyledSubEntityParent>
      {subEntity.entityDetails.map(
        (
          detail: {
            browser: string;
            value: number;
          },
          index: number
        ) => (
          <StyledSubEntityParent key={index}>
            <StyledSubEntityChild1
              key={index}
              showPlot={config ? config.showPlot : true}
            >
              {numberFormatter(detail.value)}
              {subEntity.header === "Fill rate" ? "%" : ""}
            </StyledSubEntityChild1>
            {config?.showPlot && (
              <StyledSubEntityChild2>
                <StyledDot min={min} max={max} value={detail.value} />
              </StyledSubEntityChild2>
            )}
          </StyledSubEntityParent>
        )
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div``;
const StyledDot = styled.div<{ min: number; max: number; value: number }>`
  background: skyblue;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  left: ${(props) =>
    `${((props.value - props.min) / (props.max - props.min)) * 100 - 2.5}%`};
`;

const StyledSubEntityParent = styled.div`
  height: 22px;
`;

const StyledSubEntityChild1 = styled.div<{
  showPlot: boolean;
}>`
  float: ${(props) => `${props.showPlot ? "left" : "none"}`};
  width: 20%;
  margin: 0 auto;
`;

const StyledSubEntityChild2 = styled.div`
  height: 22px;
  width: 80%;
  float: left;
  position: relative;
  background: lightgray;
  margin-bottom: 2px;
`;

const StyledSubHeaderChild1 = styled.div`
  width: 22%;
  float: left;
  text-align: right;
`;

const StyledSubHeaderChild2 = styled.div`
  float: left;
  text-align: right;
  width: 78%;
`;

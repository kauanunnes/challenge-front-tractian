import styled from "styled-components";

export const Container = styled.div`
  width: 75vw;
  margin: 15px auto;

  display: flex;
  gap: 15px;

  .graphicArea {
    width: 50%;

    .graphic  {
      width: 100%;
      height: auto;
      border: 1px solid #f0f0f0;
    }
  }

  h3 {
    margin: 0;
  }

  .warningArea, 
  .operationArea {
    width: 17.5%;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .graphicArea {
      width: 100%;

      .highcharts-background {
        width: 100%;
      }
    }

    .warningArea, 
    .operationArea {
      width: 80%;
    }

    .operationArea {
      margin-bottom: 15px;
    } 
  }
`
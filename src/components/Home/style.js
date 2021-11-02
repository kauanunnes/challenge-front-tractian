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
      /* padding: 10px; */
    }
  }

  .warningArea {
    width: 35%;
  }
`
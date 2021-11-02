import styled from "styled-components";

export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    max-width: 350px;
    height: auto;
  }

  table {
    border-collapse: collapse;
    width: 80%;
    max-width: 350px;
    margin: 15px 0;
  }

  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;

    ul {
      width: 80%;
      margin: 5px 20px;
    }
  }

  td:nth-child(odd) {
    background-color: #dddddd;
  }
`
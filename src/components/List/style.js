import styled from "styled-components";

export const Container = styled.div`
  margin: 15px auto;
  
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  width: 75vw;
  

  .loadingCard, .userCard {
    width: 300px;
  }

  @media only screen and (max-width: 768px) {
    justify-content: center;
    margin-bottom: 20px;
    
    .loadingCard, 
    .userCard {
      width: 250px;
      margin-bottom: 15px;
    }
  }
` 
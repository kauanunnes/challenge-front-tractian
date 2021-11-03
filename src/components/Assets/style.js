import styled from 'styled-components'

export const AssetsContainer = styled.div`
  width: 100%;
  padding: 15px;
  background: #fff;

  ul {
    list-style-type: none;    
    width: 75%;
    
    margin: 0 auto;
    
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 15px;

    .cardContainer {
      .cardAsset {
        height: 100%;
        display: flex;
        justify-content: space-around;

        h3 {
          font-weight: 400;
        }

        img {
          max-width: 150px;
          height: auto;
          max-height: 80%;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    ul {
      padding: 0;
      width: 85%;
      
      .cardContainer {
        .cardAsset {
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
      }
    }

  }
`

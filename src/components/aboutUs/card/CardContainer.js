import React from 'react';
import styled from "styled-components";

export default function CardContainer({ children }) {

  const Container = styled.div`
    
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
   
    
  
position: relative;
width: 300px;
height: 300px;
left: 50px;
top: 650px;


  }
  }
  `;

  return (
    <Container>
      {children}
    </Container>
  )
}

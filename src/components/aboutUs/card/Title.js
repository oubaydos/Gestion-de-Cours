import React from 'react';
import styled from "styled-components";

export default function Title(props) {

    const Container = styled.div`
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        height: 164.36px;
        margin-bottom: 11.74px;
    `;

    const Img = styled.img`
        height: 93.92px;
        border-radius: 50%;
    
    `;

    const Name = styled.h3`
        font-size: 15px;
        font-weight: 600;
      color: #144081;
      text-align: center;
        }
    `;

    const Position = styled.p`
    font-weight:100;
    font-size: 20px;
    text-align: center;
   
`;
    return (
        <Container>
            <Img src={props.img} />
            <Name style={{
       
          fontSize: "20px",
         
          fontFamily: "Comfortaa",
          marginTop:"10%",
          
          fontWeight: 550,}}>{props.name}</Name>
            <Position style={{
        marginTop:"10%",
      
       
      }} >Software Engineering Student</Position>
        </Container>
    )
}

import React from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import ReactTooltip from "react-tooltip";
export default function Socials(props) {

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: "space-between";
        align-items: right;
       marginTop:"40%",
       height: 58.7px;
        width: 293.5px;
        
    `;

    const Icon = (props) => (
        <SocialIcon {...props} style={{ width: 32, height: 32 }} />
    )

    return (
        
        <Container>
            <Icon data-tip={props.name} url={props.git} bgColor="#474747" />
            <Icon data-tip={props.name} url={props.link} />
          
            <Icon data-tip={props.email} url={props.emai}/>
          
            <ReactTooltip />
        </Container>
    )
}
/* <Icon data-tip="alessandrowirawan@gmail.com" url="mailto:alessandrowirawan@gmail.com" />*/
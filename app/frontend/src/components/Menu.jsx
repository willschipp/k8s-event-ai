import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Content,ListBox,Item,Heading } from '@adobe/react-spectrum';

function Menu() {

    const navigate = useNavigate();    

    const handleNavigation = (selected) => {
        var selection = [...selected][0];
        if (selection === 'issues') {
            navigate('/issues');
        } else if (selection === 'configs') {
            navigate('/configs');
        } else {
            navigate('/');
        }
    }

    return (
        <Content margin="size-200">
            <Heading level={3}>
                Menu
            </Heading>
            <ListBox
                aria-label="Menu"
                selectionMode="single"
                onSelectionChange={handleNavigation}>
                <Item key="home">Home</Item>
                <Item key="issues">Current Issues</Item>
                <Item key="configs">Cluster Configuration</Item>
            </ListBox>
        </Content>
    )
}


export default Menu;
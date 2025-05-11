import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Content,ListBox,Item,Heading } from '@adobe/react-spectrum';

function Menu() {

    const navigate = useNavigate();    

    const handleNavigation = (selected) => {
        var selection = [...selected][0];
        if (selection === 'events') {
            navigate('/events');
        } else if (selection === 'new_config') {
            navigate('/new_config');
        } else if (selection === 'clusters') {
            navigate('/clusters');
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
                <Item key="clusters">Clusters</Item>
                {/* <Item key="events">Current Events</Item> */}
                <Item key="new_config">New Cluster</Item>
            </ListBox>
        </Content>
    )
}


export default Menu;
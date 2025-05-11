import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Content, TableView, Column, Row, TableHeader, Cell, TableBody, Button, Link, Well } from '@adobe/react-spectrum';

import Browse from '@spectrum-icons/workflow/Browse';

function Events() {


    const location = useLocation();
    const navigate = useNavigate();
    const clusterId = location.state?.clusterId;
    const [data, setData] = useState([]);
    // const [details, setDetails] = useState([])
    let results = '';

    const getEvents = async () => {
        try {
            let url = '/api/clusters/' + clusterId + '/events';
            //get the events
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('http error!');
            }
            results = await response.json();
            setData(results.events);
            console.log(results);
        } catch (e) {
            console.error(e);
        }
    }

    const handleView = (e) => {
        navigate('/event', { state: { eventId: e, clusterId: clusterId }})
    }

    useEffect(() => {
        getEvents();
    },[])

    return (
        <Content>                        
            <TableView width="calc(100% - size-1000)">
                <TableHeader>
                    <Column>Event Id</Column>
                    <Column>Deployment</Column>
                    <Column>Description</Column>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? 
                        (data.map((item,index) => (
                            <Row key={index}>
                                <Cell>
                                    {item.eventId}
                                </Cell>
                                <Cell>
                                    <Link onPress={() => handleView(item.eventId)}>
                                        {item.deployment}
                                    </Link>
                                </Cell>
                                <Cell>
                                    {item.description}
                                </Cell>
                            </Row>
                        ))) : (
                            <Row>
                                <Cell colSpan={3}>No Events in this Cluster</Cell>
                            </Row>
                        )
                    }
                </TableBody>
            </TableView>            
        </Content>
    )
}

export default Events;
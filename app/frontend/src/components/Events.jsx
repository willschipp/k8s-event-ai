import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Content, TableView, Column, Row, TableHeader, Cell, TableBody, Button, Link, View } from '@adobe/react-spectrum';

import Refresh from '@spectrum-icons/workflow/Refresh';

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

    const triggerRefresh = async () => {
        //use the clusterId to invoke a refresh
        try {
            const response = await fetch('/api/clusters/' + clusterId,{
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                }                
            });
            if (response.status !== 204) {
                console.log(response)
                throw new Error('http error ',response);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleView = (e) => {
        navigate('/event', { state: { eventId: e, clusterId: clusterId }})
    }

    const handleRefresh = (e) => {
        triggerRefresh();
    }

    useEffect(() => {
        getEvents();
    },[])

    return (
        <Content>
            <View padding="10px">
                <Button onPress={handleRefresh}>
                    <Refresh/>                   
                </Button>
            </View>  
            <TableView width="calc(100% - size-1000)">
                <TableHeader>
                    <Column>Event Id</Column>
                    <Column>Namespace</Column>
                    <Column>Pod Name</Column>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? 
                        (data.map((item,index) => (
                            <Row key={index}>
                                <Cell>
                                    {item.eventId}
                                </Cell>
                                <Cell>
                                    {item.namespace}
                                </Cell>
                                <Cell>
                                    <Link onPress={() => handleView(item.eventId)}>
                                        {item.name}
                                    </Link>
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
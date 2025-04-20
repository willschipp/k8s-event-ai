import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Content, TableView, Column, Row, TableHeader, Cell, TableBody, Button, View, Well } from '@adobe/react-spectrum';
import AddCircle from '@spectrum-icons/workflow/AddCircle';
import DeleteOutline from '@spectrum-icons/workflow/DeleteOutline';
import ViewDetail from '@spectrum-icons/workflow/ViewDetail';

function Configs() {

    const [data, setData] = useState([]);
    const [details, setDetails] = useState([])

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch('/api/cluster/config');
            if (!response.ok) {
                throw new Error(`http error! status: ${response.status}`);
            }
            let result = await response.json();
            setData(result);
            console.log(result);
        }
        catch (e) {
            console.error(e);
        }
    }


    const handleView = (issueId) => {
        //build the navigate with the location
        navigate('/order', { state: { orderId: orderId }});
    }
    
    const handleNew = () => {
        navigate('/new_config')
    }

    useEffect(() => {
        fetchData();
    },[]);        

    return (
        <Content>                        
            <TableView width="calc(100% - size-1000)">
                <TableHeader>
                    <Column>Cluster</Column>
                    <Column>
                        <Button onPress={handleNew}>
                            <AddCircle/>
                            &nbsp;
                            New Cluster
                        </Button>
                    </Column>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? 
                        (data.map((item,index) => (
                            <Row key={index}>
                                <Cell>
                                    {item.clusters[0].name}
                                </Cell>
                                <Cell>
                                    <Button onPress={() => handleView(item.clusters[0].name)}>
                                        <ViewDetail/>
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button onPress={() => handleDelete(item.clusters[0].name)}>
                                        <DeleteOutline/>
                                    </Button>
                                </Cell>
                            </Row>
                        ))) : (
                            <Row>
                                <Cell colSpan={2}>No cluster configurations</Cell>
                            </Row>
                        )
                    }
                </TableBody>
            </TableView>
            <View>
                <Well marginTop="size-100">
                    <pre style={{
                        whiteSpace:'pre-wrap',
                        margin: 0,
                        fontFamily: 'monospace',
                        maxHeight: '500px',
                        overflow: 'auto'
                    }}>
                        {/* {typeof details === 'string' ? details : JSON.stringify(details,null,2)} */}
                        {details}
                    </pre>
                </Well>
            </View>            
        </Content>
    )
}

export default Configs;
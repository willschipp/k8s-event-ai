import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Content, TableView, Column, Row, TableHeader, Cell, TableBody, Button, View, Well } from '@adobe/react-spectrum';

import Browse from '@spectrum-icons/workflow/Browse';

function Issues() {

    const [data, setData] = useState([]);
    const [details, setDetails] = useState([])

    const handleView = (issueId) => {
        //build the navigate with the location
        navigate('/order', { state: { orderId: orderId }});
    }    

    return (
        <Content>                        
            <TableView width="calc(100% - size-1000)">
                <TableHeader>
                    <Column>Cluster</Column>
                    <Column>Namespace</Column>
                    <Column>Pod</Column>
                    <Column>Action</Column>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? 
                        (data.map((item,index) => (
                            <Row key={index}>
                                <Cell>
                                    {item}
                                </Cell>
                                <Cell>
                                    <Button onPress={() => handleView(item.issueId)}>
                                        <ViewDetail/>
                                    </Button>                                    
                                    &nbsp;&nbsp;
                                    <Button onPress={() => handleView(item.issueId)}>
                                        <Download/>
                                    </Button>
                                </Cell>
                            </Row>
                        ))) : (
                            <Row>
                                <Cell colSpan={4}>No Issues in the Clusters</Cell>
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

export default Issues;
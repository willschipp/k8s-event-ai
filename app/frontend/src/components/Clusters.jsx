import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content, TableView, Column, Row, TableHeader, Cell, TableBody, Button, Link, View, Well } from '@adobe/react-spectrum';

import AddCircle from '@spectrum-icons/workflow/AddCircle';

function Clusters() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    let result = ''

    useEffect(() => {
        getClusters();
    },[]);

    const getClusters = async () => {
        try {
            const response = await fetch('/api/clusters');
            if (!response.ok) {
                throw new Error("error retrieving");
            }
            result = await response.json();
            setData(result.clusters);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    const handleView = (e) => {
        navigate('/events', { state: { clusterId: e }});
    }

    const handleNew = () => {
        navigate('/new_config')
    }

    return (<Content>    
            <View padding="10px">
                <Button onPress={handleNew}>
                    <AddCircle/>
                    &nbsp;
                    New Cluster
                </Button>
            </View>
            <View>
                <TableView width="calc(100% - size-1000)">
                    <TableHeader>
                        <Column>Cluster Id</Column>
                        <Column>Name</Column>
                        <Column>Status</Column>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? 
                            (data.map((item,index) => (
                                <Row key={index}>
                                    <Cell>
                                        {item.clusterId}
                                    </Cell>
                                    <Cell>
                                        <Link onPress={() => handleView(item.clusterId)}>
                                            {item.name}
                                        </Link>
                                    </Cell>
                                    <Cell>
                                        {item.status}
                                    </Cell>
                                </Row>
                            ))) : (
                                <Row>
                                    <Cell colSpan={3}>No Clusters</Cell>
                                </Row>
                            )
                        }
                    </TableBody>
                </TableView> 
            </View>              
        </Content>
    )
}

export default Clusters;

// {data.length > 0 ? 
//                         (data.map((item,index) => (
//                             <Row key={index}>
//                                 <Cell>
//                                     {item.clusterId}
//                                 </Cell>
//                                 <Cell>
//                                     <Button onPress={() => handleView(item.clusterId)}>
//                                         {item.name}
//                                     </Button>
//                                 </Cell>
//                             </Row>
//                         ))) : (
//                             <Row>
//                                 <Cell colSpan={2}>No Clusters</Cell>
//                             </Row>
//                         )
//                     }
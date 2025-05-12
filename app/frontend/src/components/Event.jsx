import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from "react-markdown";

import {Content, View, TableView, Column, Row, TableHeader, Cell, TableBody, Header, Well } from '@adobe/react-spectrum';

function Event() {

    const location = useLocation();
    const eventId = location.state?.eventId;
    const clusterId = location.state?.clusterId;
    const [data,setData] = useState({
        "event":{
            "eventId":0,
            "description":"",
            "deployment":""
        },
        "solution":{
            "description":"",
            "solutions":[{
                "solution_number":1,
                "steps":[
                    {
                        "step":1,
                        "process":""
                    }
                ]
            }]
        }
    });
    let results = '';
    
    const getEvent = async () => {
        try {
            let url = '/api/clusters/' + clusterId + '/events/' + eventId;
            //get the event
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('http error');
            }
            results = await response.json();
            setData(results)
            console.log(results);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getEvent();
    },[]);

    return(
        <Content>
            <View>        
                <Header>Event ID:&nbsp;{data.event.eventId}</Header>        
                {/* <Well>
                    <h3>Deployment</h3>
                    <p>{data.event.deployment}</p>
                    <h3>Event Description</h3>
                    <p>{data.event.description}</p>
                </Well> */}
                <Well>
                    <h3>Explanation</h3>
                    <p>{data.solution.description}</p>
                    <h3>Solutions</h3>

                    {data.solution.solutions.length > 0 ? (
                        data.solution.solutions.map((solution,index) => (
                            <>
                                <p>Solution Number: {solution.solution_number}</p>
                                <TableView aria-label="Solution Table" overflowMode='wrap'>
                                    <TableHeader>
                                        <Column maxWidth={80}>Step</Column>
                                        <Column>Description</Column>
                                    </TableHeader>
                                    <TableBody>
                                        {solution.steps.length > 0 ? (
                                            solution.steps.map((step,idx) => (
                                                <Row index={idx}>
                                                    <Cell>{step.step}</Cell>
                                                    <Cell>
                                                        <Well>
                                                            <ReactMarkdown>{step.process}</ReactMarkdown>
                                                        </Well>
                                                    </Cell>
                                                </Row>
                                            ))
                                        ) : (
                                            <Row>
                                                <Cell colspan={2}>No Steps</Cell>
                                            </Row>
                                        )}
                                    </TableBody>
                                </TableView>
                            </>
                        ))
                    ) : (
                        <p>No solutions</p>
                    )}
                </Well>
            </View>
        </Content>
    )
}

export default Event;




                    // <TableView>
                    //     <TableHeader>
                    //         <Column>Step</Column>
                    //         <Column>Description</Column>
                    //     </TableHeader>
                    //     <TableBody>
                    //         {data.solution.solutions > 0 ? ( //TODO fix this to by dynamic
                    //             data.solution.solutions[0].steps.map((item,index) => (
                    //                 <Row key={index}>
                    //                     <Cell>
                    //                         {item.step}
                    //                     </Cell>
                    //                     <Cell>
                    //                         {item.process}
                    //                     </Cell>
                    //                 </Row>
                    //             ))
                    //         ) : (
                    //             <Row>
                    //                 <Cell colSpan={2}>No Solutions</Cell>
                    //             </Row>
                    //         )}
                    //     </TableBody>
                    // </TableView>
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form, TextArea, Button, Picker, Item, TextField, Content  } from '@adobe/react-spectrum';

function NewCluster() {

    const [data,setData] = useState([]);
    const [cluster_text,setClusterText] = useState([]);
    const [cluster_name,setClusterName] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('cluster_name',cluster_name);
        formData.append('cluster_yaml',cluster_text);
        
        fetch('/api/clusters',{
            method: 'POST',
            body: formData
        }).then((response) => {
            if (response.status == 201) {
                //navigate
                navigate('/clusters')
            } else {
                console.error('unexpected status',response.status);
            }    
        }).catch((error) => {
            console.error('Could not save',error);
        });
    }

    return (
        <Content width="calc(100% - size-1000)">
            <Form onSubmit={handleSubmit}>
                <TextField label="Cluster Name" isRequired={true} value={cluster_name} onChange={setClusterName}/>
                <TextArea label="Copy & Paste your config file here" isRequired={true} value={cluster_text} onChange={setClusterText} height="size-3000"/>
                <Button type="submit" maxWidth="size-1000">Save</Button>
            </Form>
        </Content>
    )
}

export default NewCluster;
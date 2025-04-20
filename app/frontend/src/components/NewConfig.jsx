import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form, TextArea, Button, Picker, Item, TextField, Content, Heading  } from '@adobe/react-spectrum';

function NewConfig() {

    const [data,setData] = useState([]);
    const [config_text,setConfigText] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('config_yaml',config_text);
        
        fetch('/api/cluster/config',{
            method: 'POST',
            body: formData
        }).then((response) => {
            if (response.status == 201) {
                //navigate
                navigate('/configs')
            } else {
                console.error('unexpected status',response.status);
            }    
        }).catch((error) => {
            console.error('Could not save',error);
        });
    }

    return (
        <Content>
            <Form onSubmit={handleSubmit}>
                <TextArea label="Copy & Paste your config file here" isRequired={true} value={config_text} onChange={setConfigText} height="size-3000"/>
                <Button type="submit" maxWidth="size-1000">Save</Button>
            </Form>
        </Content>
    )
}

export default NewConfig;
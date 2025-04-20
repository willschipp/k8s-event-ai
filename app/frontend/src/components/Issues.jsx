import React from 'react';

import { Content, Header, Heading } from '@adobe/react-spectrum';

import Browse from '@spectrum-icons/workflow/Browse';

function Issues() {

    return (
        <Content width="calc(100% - size-1000)">
            <Heading level={3}>Issues being Watched</Heading>
            [table of issues]            
        </Content>
    )
}

export default Issues;
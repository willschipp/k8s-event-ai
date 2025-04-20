import React from 'react';

import App from './App';

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                </Route>
            </Routes>
        </Router>
    )
}

export default Routing;
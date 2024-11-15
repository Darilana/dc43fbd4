import React from 'react';

import Header from './Header';
import { ActivityFeed } from './features/activity-feed/ActivityFeed';
import { ActivityContextProvider } from './data/ActivityContext';

const App = () => {
    return (
        <ActivityContextProvider>
            <div className="container">
                <Header />
                <ActivityFeed />
            </div>
        </ActivityContextProvider>
    );
};

export default App;

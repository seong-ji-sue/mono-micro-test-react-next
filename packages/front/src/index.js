import React from 'react';
import {createRoot} from 'react-dom/client';

const App = () => {
    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3001/');
            const message = await response.text();
            alert(message);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>버튼 클릭 테스트</button>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

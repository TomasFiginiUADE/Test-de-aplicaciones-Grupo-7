import React from 'react';
import ExperienceLevelSelector from './ExperienceLevelSelector';
import EquipmentSelector from './EquipmentSelector';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Your Training Tracker</h1>
            <h2>Select Your Experience Level</h2>
            <ExperienceLevelSelector />
            <h2>Select Your Gym Equipment</h2>
            <EquipmentSelector />
        </div>
    );
};

export default Home;
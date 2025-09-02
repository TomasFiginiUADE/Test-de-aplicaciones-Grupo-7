document.addEventListener('DOMContentLoaded', () => {
    const experienceLevelSelect = document.getElementById('experience-level');
    const equipmentSelect = document.getElementById('equipment');
    const recordWorkoutButton = document.getElementById('record-workout');

    // Load experience levels and equipment options
    loadExperienceLevels();
    loadEquipmentOptions();

    // Event listeners
    experienceLevelSelect.addEventListener('change', handleExperienceLevelChange);
    equipmentSelect.addEventListener('change', handleEquipmentChange);
    recordWorkoutButton.addEventListener('click', openWorkoutRecording);

    function loadExperienceLevels() {
        const levels = ['Beginner', 'Intermediate', 'Advanced'];
        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            experienceLevelSelect.appendChild(option);
        });
    }

    function loadEquipmentOptions() {
        const equipment = ['Dumbbells', 'Barbell', 'Bench', 'Treadmill'];
        equipment.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            equipmentSelect.appendChild(option);
        });
    }

    function handleExperienceLevelChange() {
        const selectedLevel = experienceLevelSelect.value;
        // Logic to handle experience level change
        console.log(`Selected Experience Level: ${selectedLevel}`);
    }

    function handleEquipmentChange() {
        const selectedEquipment = equipmentSelect.value;
        // Logic to handle equipment change
        console.log(`Selected Equipment: ${selectedEquipment}`);
    }

    function openWorkoutRecording() {
        // Logic to open the workout recording UI
        console.log('Opening workout recording interface...');
    }
});
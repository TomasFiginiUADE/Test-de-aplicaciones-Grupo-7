const equipmentOptions = [
    { id: 1, name: 'Dumbbells' },
    { id: 2, name: 'Barbell' },
    { id: 3, name: 'Bench Press' },
    { id: 4, name: 'Squat Rack' },
    { id: 5, name: 'Treadmill' },
    { id: 6, name: 'Stationary Bike' },
];

function generateEquipmentSelection() {
    const container = document.createElement('div');
    container.className = 'equipment-selection';

    const title = document.createElement('h2');
    title.textContent = 'Select Gym Equipment';
    container.appendChild(title);

    equipmentOptions.forEach(option => {
        const label = document.createElement('label');
        label.htmlFor = `equipment-${option.id}`;
        label.textContent = option.name;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `equipment-${option.id}`;
        checkbox.value = option.name;

        label.appendChild(checkbox);
        container.appendChild(label);
    });

    return container;
}

export default generateEquipmentSelection;
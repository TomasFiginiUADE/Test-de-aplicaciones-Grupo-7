# Simple Training Webpage

This project is a simple training webpage designed to help users select their experience level, choose gym equipment, and manually record workouts. The application utilizes local storage to save user selections and workout records, providing a seamless user experience.

## Features

- **User Experience Level Selection**: Users can select their experience level from predefined options.
- **Gym Equipment Selection**: Users can choose from a list of gym equipment available for their workouts.
- **Workout Recording**: Users can manually record their workouts, including exercise name, weight, repetitions, and sets.
- **Local Data Storage**: The application uses the browser's localStorage API to save user selections and workout records.

## Project Structure

```
simple-training-webpage
├── public
│   └── index.html          # Main HTML document
├── src
│   ├── css
│   │   └── styles.css      # Styles for the webpage
│   ├── js
│   │   ├── index.js        # Main JavaScript entry point
│   │   ├── ui.js           # User interface interactions
│   │   ├── storage.js      # Local data storage management
│   │   ├── data.js         # Constants and data structures
│   │   └── workouts.js      # Workout recording functionality
│   └── components
│       ├── home.js         # Home page component
│       ├── equipment.js     # Equipment selection component
│       └── record-workout.js # Workout recording component
├── .gitignore               # Files to ignore by version control
├── package.json             # npm configuration file
└── README.md                # Project documentation
```

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Open `public/index.html` in your web browser to view the application.

## Usage

- Select your experience level and gym equipment on the home page.
- Navigate to the workout recording section to log your workouts.
- Your selections and recorded workouts will be saved in local storage for future access.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.
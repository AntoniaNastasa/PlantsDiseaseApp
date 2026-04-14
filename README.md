# Plant Disease Detection App

A full-stack solution designed to identify plant diseases using Deep Learning. This project includes the model training pipeline and a mobile application for real-time detection.

##Project Overview
This application allows users to take or upload photos of plants, which are then processed by a neural network to identify specific diseases (e.g., Potato Late Blight).

##Repository Structure
* **`PlantDiseaseApp/Training/`**: Contains Jupyter Notebooks (`.ipynb`), datasets, and scripts used to train and export the TensorFlow/Keras model.
* **`PlantDiseaseApp/mobile1/`**: The mobile client built with React Native.
* **`DataSets/`**: (Ignored by Git) Local storage for raw images.

##Tech Stack
* **Mobile**: React Native
* **AI/Machine Learning**: Python, TensorFlow, Keras, NumPy
* **Tools**: Jupyter Notebook, Git

##Setup Instructions

### 1. Model Training
To retrain the model or check the accuracy:
1. Navigate to the training folder
2. Install dependencies
3. Open training.ipynb in Jupyter or VS Code and run all cells
4. Mobile App:
  To run the mobile application:
  Navigate to the mobile directory:
  cd PlantDiseaseApp/mobile1
  Install packages:
  npm install
  Start the development server

import axios from 'axios';

//const API_URL = 'http://localhost:8000/predict';
const API_URL =
  'https://us-central1-plantdisease-427514.cloudfunctions.net/predict';

export const uploadImage = async imageUri => {
  const formData = new FormData();
  //adaugarea imaginii la „FormData”
  //„file” e cheia sub care cloudul asteapta fisierul imagine
  formData.append('file', {
    uri: imageUri, // URI-ul local al imaginii de pe dispozitivul mobil
    type: 'image/jpeg', // Tipul de conținut al fișierului
    name: 'image.jpg', // Numele fișierului, poate fi orice, dar trebuie să includă extensia
  });

  try {
    console.log('trimite imaginea cu URI', imageUri);
    // Trimiterea cererii POST la Google Cloud Function
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Raspuns>', response.data);
    // Returnarea datelor primite de la server, care ar trebui să fie predicția
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

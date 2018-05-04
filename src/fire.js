import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC_l8Tp8hGwHP8c8WoPCPW-nbuTLS99ifU",
    authDomain: "react-quiz-app-9b726.firebaseapp.com",
    databaseURL: "https://react-quiz-app-9b726.firebaseio.com",
    projectId: "react-quiz-app-9b726",
    storageBucket: "",
    messagingSenderId: "1011163949482"
};

var fire = firebase.initializeApp(config);

export default fire;

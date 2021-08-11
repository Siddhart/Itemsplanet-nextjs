import firebase from "firebase";

const firebaseConfig = {
    "apiKey": "AIzaSyBXo_D46nCrl171dxd27biY3x-8ObCM_gU",
    "authDomain": "itemsplanet-database.firebaseapp.com",
    "projectId": "itemsplanet-database",
    "storageBucket": "itemsplanet-database.appspot.com",
    "messagingSenderId": "912158717721",
    "appId": "1:912158717721:web:518413452abc5c68043788"
};

if(typeof window !== 'undefined' && !firebase.apps.length){
    firebase.initializeApp(firebaseConfig)

    if('measurementId' in firebaseConfig) firebase.analytics()
}

export default firebase
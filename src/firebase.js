<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD8QErpKWXAqNDqIty8Qo5TN9SaAZJg8no",
    authDomain: "kn-dental-reparto-fec33.firebaseapp.com",
    projectId: "kn-dental-reparto-fec33",
    storageBucket: "kn-dental-reparto-fec33.firebasestorage.app",
    messagingSenderId: "366383482545",
    appId: "1:366383482545:web:5ec38293c6c7c5b49c4490",
    measurementId: "G-1H49HT098G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

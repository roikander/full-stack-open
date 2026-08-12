import ReactDOM from 'react-dom/client'

// importtaa komponentti App nykyisestä kansiosta App(./)
import App from './App'

// renderöi App.jsx:stä saamansa App-komponentin 
// tiedoston index.html div id:hen "root"
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

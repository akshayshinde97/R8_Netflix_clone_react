
import './App.css';
// import requests from './components/getData';
import {movies} from "./components/getData";
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourite from './components/Favourite';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact render={(props)=>(
          <>
            <Banner {...props}/>
            <Movies {...props}/>
          </>
        )}/>
        <Route path='/favourites' component={Favourite} />
      </Switch>
      {/* <Banner/> */}
      {/* <Movies/> name="udai" */}
      {/* <Favourite/> */}
    </Router>
  );
}

export default App;
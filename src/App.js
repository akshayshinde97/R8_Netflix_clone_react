import './App.css';
// import requests from './components/getData';
import {movies} from "./components/getData";
import Navbar from './components/Navbar';
import NavbarResp from './components/NavbarResp';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourite from './components/Favourite';
// import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Mmovies from './components/Mmovies';
function App() {
  return (
    <Router history = {history}>
      <NavbarResp/>
      <Switch>
        <Route path='/' exact render={(props)=>(
          <>
            <Banner {...props}/>
            {/* <Movies {...props}/> */}
            <Mmovies />
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
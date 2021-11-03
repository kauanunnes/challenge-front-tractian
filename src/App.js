import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./components/Home";
import Nav from './components/Nav';
import Assets from './components/Assets';
import List from './components/List';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/assets/">
          <Assets />
        </Route>
        <Route path="/users/">
          <List typeOfList="users" />
        </Route>
        <Route path="/units/">
          <List typeOfList="units" />
        </Route>
        <Route path="/companies/">
          <List typeOfList="companies" />
        </Route>

      </Switch>
    </Router>  
  );
}

export default App;

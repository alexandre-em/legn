import { Route, Router, Switch } from "react-router-dom";
import Home from "./views/Home/Home"
import ChordChanges from "./views/ChordChanges/ChordChanges"
import ChordSheet from "./views/ChordSheet/ChordSheet"
import AddSheet from "./views/AddSheet/AddSheet"
import Scales from "./views/Scales/Scales"
import Settings from "./views/Settings/Settings"
import NotFound from "./views/NotFound/NotFound"
import { createBrowserHistory } from "history";
import Header from "./components/Header/Header";

function App() {
  const history = createBrowserHistory()
  return (
    <div className="App">
      <Header />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/changes" component={ChordChanges} />
          <Route path="/sheet" component={ChordSheet} />
          <Route path="/sheet/add" component={AddSheet} />
          <Route path="/scales" component={Scales} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

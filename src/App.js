import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./views/Home/Home"
import ChordChanges from "./views/ChordChanges/ChordChanges"
import ChordSheet from "./views/ChordSheet/ChordSheet"
import AddSheet from "./views/AddSheet/AddSheet"
import Scales from "./views/Scales/Scales"
import Settings from "./views/Settings/Settings"
import NotFound from "./views/NotFound/NotFound"
import Header from "./components/Header/Header";
import Menu from "./components/Body/Menu/Menu";
import Sheet from "./views/Sheet/Sheet";
import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory()
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <Header />
        <div className="body">
          <Menu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/changes" component={ChordChanges} />
            <Route path="/sheets" component={ChordSheet} />
            <Route path="/sheet/:id" component={Sheet} />
            <Route path="/add" component={AddSheet} />
            <Route path="/scales" component={Scales} />
            <Route path="/settings" component={Settings} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

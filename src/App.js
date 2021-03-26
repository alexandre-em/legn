import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
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
import Login from "./views/Authentication/Login";
import Register from "./views/Authentication/Register";
import { useDispatch, useSelector } from "react-redux";
import { checkInfo } from "./services/Api/Auth";
import { logout } from "./store/actions";

function App() {
  const history = createBrowserHistory()
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.token) {
      checkInfo(user.token)
        .catch((error) => {
          dispatch(logout())
        })
    }
  }, [])

  if (!user?.token) {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          <div className="body">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
  else {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          <Header />
          <div className="body">
            <Menu />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/changes" component={ChordChanges} />
              <Route path="/sheets" component={Sheet} />
              <Route path="/sheet/:id" component={ChordSheet} />
              <Route path="/add" component={AddSheet} />
              <Route path="/scales" component={Scales} />
              <Route path="/settings" component={Settings} />
              {/* TODO */}
              {/* Tuto page */}
              {/* Tuner */}
              {/* Chat */}
              
              <Route path="/register" render={() => <Redirect to="/" />} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

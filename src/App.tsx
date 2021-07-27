import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppContainer from "./AppContainer";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/" component={AppContainer} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

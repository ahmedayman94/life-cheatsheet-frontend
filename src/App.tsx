import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './config/routes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

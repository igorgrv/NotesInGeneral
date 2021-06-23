import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './components/Welcome';
import Products from './components/Products';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:productId">
            <ProductDetails />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

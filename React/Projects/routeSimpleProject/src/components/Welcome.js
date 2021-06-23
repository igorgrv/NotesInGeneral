import { Route } from 'react-router-dom';

const Welcome = () => {
  return <div>
    <h1>Welcome page</h1>
    <Route path="/welcome/admin">
      <p>Welcome admin</p>
    </Route>
  </div>
}

export default Welcome;
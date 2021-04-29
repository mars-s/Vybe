import { Route, Switch } from 'react-router-dom';
import Signup from 'components';
import Chat from 'components';
import Login from 'components';

const App = () => {
  return (
    <Switch>
      <Chat exact path='/' component={Chat} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/chat' component={Login} />
    </Switch>
  )
}

export default App

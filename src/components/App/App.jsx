import { Route, Switch } from 'react-router-dom';
import { Login, Signup, Chat } from 'components';

export const App = () => {
  return (
    <Switch>
      <Chat exact path='/' component={Chat} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/chat' component={Login} />
    </Switch>
  )
}


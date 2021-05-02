import { Route, Switch, useHistory } from 'react-router-dom';
import { Login, Signup, Chat } from 'components';
import { useAuth, useResolved } from 'hooks'
import { useEffect } from 'react';

export const App = () => {
  const history = useHistory()
  const { authUser } = useAuth()
  const authResolved = useResolved(authUser)

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? '/' : '/login')
    }
  }, [authResolved, authUser, history])

  return (
    <div className='app'>
      <Switch>
        <Chat exact path='/' component={Chat} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  )
}


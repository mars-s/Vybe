import { Route, Switch } from 'react-router-dom';
import { Login, Signup, Chat } from 'components';
import { useAuth } from 'hooks'
import { useEffect } from 'react';

export const App = () => {

  const { authUser } = useAuth()

  useEffect(() => {
    console.log('AUTH USER:', authUser)
  }, [authUser])

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


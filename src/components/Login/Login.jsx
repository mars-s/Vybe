import { useState } from 'react'
import { Formik, Form } from 'formik'
import { FormField } from 'components'
import { useHistory } from 'react-router-dom'
import { defaultValues, validationSchema } from './formikConfig'
import { fb } from 'service'

export const Login = () => {
  const history = useHistory()
  const [serverError, setServerError] = useState('')

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError("We're having trouble logging you in. please try again")
        }
      })
  }


  return (
    <div className="auth-form">
      <h1>Login</h1>

      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name='email' label='Email' type='email' />
            <FormField name='password' label='Password' type='password' />

            <div className="auth-link-container">
              Don't have an account?{' '}
              <span
                className="auth-link"
                onClick={() => history.push('signup')}
              >
                Sign Up!
                    </span>
            </div>

            <button tpye='submit' disabled={!isValid || isSubmitting}>
              Login
                </button>

          </Form>
        )}
      </Formik>

      {!!serverError && <div className='error'>{serverError}</div>}
    </div>
  )
}
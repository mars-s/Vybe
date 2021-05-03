import { useState } from "react"
import { Formik, Form } from "formik"
import { useHistory } from 'react-router-dom'
import { validationSchema, defaultValues } from './formikConfig'
import { FormField } from 'components'
import { fb } from 'service'

export const Signup = () => {
  const history = useHistory()
  const [serverError, setServerError] = useState('')

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password).then(res => {
        if (res?.user?.uid) {
          fetch('/api/createUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            })
          })
            .then(() => {
              fb.firestore
                .collection('ChatUsers')
                .doc(res.user.uid)
                .set({ userName, avatar: '' })
            })
        } else {
          setServerError("We are having trouble signing you up. Please try again.")
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('An account with this email already exists')
        } else {
          setServerError('we are having trouble signing you in. Please try again')
        }
      })
      .finally(() => setServerError(false))
  }


  return (
    <div className='auth-form'>
      <h1>Sign Up</h1>
      <Formik
        onSubmit={signup}
        validatorOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {/* where the actual html of the website goes */}
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name='email' label='E-Mail' type='email' />
            <FormField name='userName' label='Username' />
            <FormField name='password' label='Password' type='password' />
            <FormField type='password' name='verifyPassword' label='Confirm Password' />

            <button disabled={isSubmitting || !isValid} type='submit'>Sign Up</button>

            <div className="auth-link-container">
              Already have an account?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log In!
              </span>
            </div>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className='error'>{serverError}</div>}
    </div >
  )
}

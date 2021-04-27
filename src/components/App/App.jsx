import { fb } from 'service'
import { useEffect } from 'react'

export const App = () => {
  useEffect(() => {
    fb.firestore.collection('ChatUsers').where('userName', '==', 'Rain').get().then(res => {
      const user = res.docs[0]?.data()
      console.log(user)
    })
  }, [])

  return <>Hello from rain</>
}

import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Movie } from '../typings'
import { db } from '../libs/firebase'

function useList(uid: string | undefined) {
  const [list, setList] = useState<DocumentData[] | Movie[]>([])
console.log(onSnapshot);

  useEffect(() => {
    if (!uid) return

    return onSnapshot(
      collection(db, 'customers', uid, 'myList'),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
  }, [db, uid])

  return list
}

export default useList

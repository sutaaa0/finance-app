import { auth } from '@/auth'
import { TransactionForm } from '@/components/TransactionForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session = await auth();
    const userId = session?.user.id

    if(!userId) {
        redirect('/signin')
    }

  return (
    <TransactionForm userId={userId}/>
  )
}

export default page
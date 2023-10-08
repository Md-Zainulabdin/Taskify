import { authOptions } from '@/utils/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Guestlayout = async ({children}) => {
    const session = await getServerSession(authOptions);
    if (session) redirect("/projectboard")
  return (
    <>
    {children}
    </>
  )
}

export default Guestlayout
"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {

    const { details} = useParams()


  return (
    <div>Order details {details}</div>
  )
}

export default Page
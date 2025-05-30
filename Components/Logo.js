"use client"
import Image from 'next/image'
import React from 'react'
import { fetchLink } from '../Functions/fetchLink'
import '../App.css'

function Logo() {
  return (
    <Image alt='blackgold logo' className='logoblack rounded-full' width={200} height={200} src={'https://blackgold-bucket.s3.ap-south-1.amazonaws.com/logoAnim.png'}/>
  )
}

export default Logo

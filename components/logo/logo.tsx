'use client'
import Image from 'next/image'
import logo from '/public/images/logo.svg'

export const Logo = () => {
    return <Image src={logo} height={28} width={100} alt={'Executive Homes'}/>

}

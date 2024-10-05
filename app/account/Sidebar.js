'use client'
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faBagShopping, faDownload, faHouse, faUser, faRightFromBracket, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const router = usePathname();

    console.log(router)


  return (
    <section className="panel">
    <header className="panel-heading">My Account</header>
    <div className="panel-body ">
       <ul className="nav-side">
          <li className={router == "/account/dashboard" ? "active" : ""}><Link href="/account/dashboard"> Dashboard  <FontAwesomeIcon icon={faGauge} /></Link> </li>
          <li className={router == "/account/myorder" ? "active" : ""}><Link href="/account/myorder"> Orders  <FontAwesomeIcon icon={faBagShopping} /></Link> </li>
          <li className={router == "/account/wishlist" ? "active" : ""}><Link href="/account/wishlist"> Wishlist  <FontAwesomeIcon icon={faHeart} /></Link> </li>
          <li className={router == "/account/reviews" ? "active" : ""}><Link href="/account/reviews"> Reviews  <FontAwesomeIcon icon={faComment} /></Link> </li>
          <li className={router == "/account/address" ? "active" : ""}><Link href="/account/address"> Address  <FontAwesomeIcon icon={faHouse} /></Link> </li>
          <li className={router == "/account/account-details" ? "active" : ""}><Link href="/account/account-details"> Account details  <FontAwesomeIcon icon={faUser} /></Link> </li>
          <li className={router.pathname == "/account/dashboard" ? "active" : ""}><Link href="/account/dashboard"> Logout  <FontAwesomeIcon icon={faRightFromBracket} /></Link> </li>
      
       </ul>
    </div>
 </section>
  )
}

export default Sidebar
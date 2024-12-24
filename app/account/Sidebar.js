'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faBagShopping, faDownload, faHouse, faUser, faRightFromBracket, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { usePathname, useRouter } from 'next/navigation'
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux'
import { AuthTokenAction } from '@/redux/reducer/DataflowReducer'

const Sidebar = () => {
      const [show, setShow] = useState(false);
      
const handleClose = () => setShow(false);
    const router = usePathname();
    const router1 = useRouter();
    let dispatch = useDispatch()


function LogoutHandle(){
   setShow(false)
   localStorage.clear()
   window.location.href = '/';
   dispatch(AuthTokenAction(''))

}


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

          <li className={"logout"}><button onClick={()=>setShow(true)}>Logout <FontAwesomeIcon icon={faRightFromBracket} /> </button> </li>
      
       </ul>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h5 className='mb-4'>Are you sure logout</h5>
        <button className='btn btn-outline-danger' onClick={handleClose}>Cancel</button>
        <button className='btn btn-primary ms-2' onClick={LogoutHandle}>Confirm</button>

        </Modal.Body>
     
            
     
      </Modal>
 </section>
  )
}

export default Sidebar
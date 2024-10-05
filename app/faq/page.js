"use client"
import { useParams } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { IMAGE } from '@/utils/Theme'
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from 'react-bootstrap'
import rightArrow from '@/public/assets/image/right_arrow.png'


const page = () => {
  return (
    <div className='inner-sec py-3'>
        <div className='container'>
            <div className='breadcrames'>
                <ul>
                    <li>
                        <Link href="/" >Home </Link>
                    </li>
                    <li>
                    <img src={rightArrow.src} alt="icon" />
                    </li>
                  
                    <li>
                        <b>FAQ</b>
                    </li>
                </ul>
            </div>
          
            <Accordion defaultActiveKey="0" className='faq-sec'>
                             
                             <Accordion.Item eventKey="0">
                                 <Accordion.Header>Lorem ipsum</Accordion.Header>
                                 <Accordion.Body className='p-2'>
                                    <b>Lorem ipsum</b>
                                    <p>Customize Bootstrap with our built-in custom variables file and easily toggle global 
                                        CSS preferences with new $enable-* Sass variables. Override a variable’s 
                                        value and recompile with npm run test as needed.</p>
                                 </Accordion.Body>
                             </Accordion.Item>
                             <Accordion.Item eventKey="1">
                                 <Accordion.Header>Lorem ipsum</Accordion.Header>
                                 <Accordion.Body className='p-2'>
                                 <b>Lorem ipsum</b>
                                    <p>Customize Bootstrap with our built-in custom variables file and easily toggle global 
                                        CSS preferences with new $enable-* Sass variables. Override a variable’s 
                                        value and recompile with npm run test as needed.</p>
                                 </Accordion.Body>
                             </Accordion.Item>
                             </Accordion>
        </div>
    </div>
  )
}

export default page
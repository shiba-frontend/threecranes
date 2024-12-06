"use client"
import { useParams } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IMAGE } from '@/utils/Theme'
import Accordion from 'react-bootstrap/Accordion';
import { Button, Card } from 'react-bootstrap'
import rightArrow from '@/public/assets/image/right_arrow.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ApiConnection from '@/utils/ApiConnection'
import Loader from '@/utils/Loader'

const Page = () => {
    const [loading, setloading] = useState(false)
const [faq, setfaq] = useState([])

    const getData = async () =>{
        try{
            setloading(true)
            const response = await ApiConnection.get('faq')
            setloading(false)
            if(response?.data.status){
                setfaq(response?.data?.data)
          
            } 
        }catch(e){}
    }
    
    useEffect(()=>{
        getData() 
    },[])



  return (
    <div className='inner-sec py-3'>
         {loading && <Loader/>}
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
            <Tabs
      defaultActiveKey={faq[0]?.faq_category_name}
      id="uncontrolled-tab-example"
      className="mb-3"
    >
       {faq&&faq.map((item, i)=>{
        return (
            <Tab eventKey={item?.faq_category_name} title={item?.faq_category_name} key={i}>
              <Accordion defaultActiveKey="0" className='faq-sec'>
                             {item?.faq_questions.map((list, index)=>{
                                return (
                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                    <Accordion.Header>{list?.question}</Accordion.Header>
                                    <Accordion.Body className='p-2'>
                                       <b>{list?.question}</b>
                                       <p>{list?.answer}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                )
                             })}
                           
                          
                             </Accordion>
          </Tab>
        )
       })} 
 
    </Tabs>
         
        </div>
    </div>
  )
}

export default Page
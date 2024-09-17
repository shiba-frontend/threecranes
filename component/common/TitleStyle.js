import React from 'react'

const TitleStyle = ({title, sub}) => {
  return (
    <div className='pageHeading'>
        <h2>{title} <sub>{sub}</sub></h2>
    </div>
  )
}

export default TitleStyle
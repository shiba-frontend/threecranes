import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className="register-form-section login-form section-padding">
    <div className="container-xxl container-xl container-lg container-md container-sm container">
       <div className="row justify-content-center">
          <div className="col-12 col-lg- col-xl-6 col-md-12 col-sm-12">
             <div className="register-form-field">
                <h3>Log in</h3>
                <div className="register-form">
                   <div className="form-outline mb-3">
                      <label className="form-label" >Username or email address*</label>
                      <input type="email"  placeholder="Enter Username"
                         className="form-control form-control-lg" />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label">Password*</label>
                      <input type="password"  placeholder="Enter Password"
                         className="form-control form-control-lg" />
                   </div>
                   <div className="log-btn-reme d-flex align-items-center mt-4">
                      <button type="button" className="btn common-btn">Login</button>
                      <div className="form-check d-flex justify-content-center">
                         <input className="form-check-input me-2" type="checkbox" value="" />
                         <label className="form-check-label" for="form2Example3g">
                            Remember me
                         </label>
                      </div>
                   </div>
                   <div className="form-outline mb-3">
                     <Link href="/" className="small  f-password">Forgot password?</Link>
                   
                   </div>
                </div>
             </div>
          </div>
          <div className="col-12 col-lg- col-xl-6 col-md-12 col-sm-12">
             <div className="register-form-field">
                <h3>Register</h3>
                <div className="register-form">
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example3cg">Email address*</label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Password*</label>
                      <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
                   </div>
                   <div className="d-flex mt-4">
                      <button type="button" className="btn common-btn">Register</button>
                   </div>
                   
                </div>
             </div>
          </div>
       </div>
    </div>
 </section>
  )
}

export default page
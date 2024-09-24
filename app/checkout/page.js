import React from 'react'
import productIMg from '@/public/assets/image/banner_img.png'
const Page = () => {
  return (
    <section className="register-form-section login-form shipping-form-section section-padding">
    <div className=" container-xxl container-xl container-lg container-md container-sm container">
       <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-8 col-md-12 col-sm-12">
             <div className="register-form-field">
                <div className='register-form'>
                   <div className="row justify-content-center">
                      <div className="col-6 col-lg-6 col-xl-6 col-md-6 col-sm-12">
                         <div className="form-outline mb-3">
                            <label className="form-label" for="form3Example3cg">First name*</label>
                            <input type="email" id="form3Example3cg" placeholder="John"
                               className="form-control form-control-lg" />
                         </div>
                      </div>
                      <div className="col-6 col-lg-6 col-xl-6 col-md-6 col-sm-12">
                         <div className="form-outline mb-3">
                            <label className="form-label" for="form3Example3cg">Last name*</label>
                            <input type="email" id="form3Example3cg" placeholder="Smith"
                               className="form-control form-control-lg" />
                         </div>
                      </div>
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example3cg">Company name(optional)</label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example3cg">Country / Region*</label>
                      <select className="form-control form-control-lg" name="countries" id="countries">
                         <option value='ad' data-title="Andorra">Andorra</option>
                         <option value='ae' data-title="United Arab Emirates">United Arab Emirates</option>
                         <option value='af' data-title="Afghanistan">Afghanistan</option>
                         <option value='ag' data-title="Antigua and Barbuda">Antigua and Barbuda</option>
                         <option value='ai' data-title="Anguilla">Anguilla</option>
                         <option value='al' data-title="Albania">Albania</option>
                         <option value='am' data-title="Armenia">Armenia</option>
                         <option value='an' data-title="Netherlands Antilles">Netherlands Antilles</option>
                      </select>
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Street address*</label>
                      <input type="email" id="form3Example3cg" placeholder="House number and street name"
                         className="form-control form-control-lg mb-2" />
                      <input type="email" id="form3Example3cg" placeholder="Apartment,suite,unit,etc. (optional)"
                         className="form-control form-control-lg" />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Suburb*</label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg " />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example3cg">State*</label>
                      <select className="form-control form-control-lg" name="countries" id="countries">
                         <option value="AP">Andhra Pradesh</option>
                         <option value="AR">Arunachal Pradesh</option>
                         <option value="AS">Assam</option>
                         <option value="BR">Bihar</option>
                         <option value="CT">Chhattisgarh</option>
                         <option value="GA">Gujarat</option>
                         <option value="HR">Haryana</option>
                         <option value="HP">Himachal Pradesh</option>
                         <option value="JK">Jammu and Kashmir</option>
                         <option value="GA">Goa</option>
                         <option value="JH">Jharkhand</option>
                         <option value="KA">Karnataka</option>
                         <option value="KL">Kerala</option>
                      </select>
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Postcode*</label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg " />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Phone(optional) </label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg " />
                   </div>
                   <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4cg">Email(optional) </label>
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg " />
                   </div>
                   <div className="log-btn-reme d-flex align-items-center mt-4">
                      <button type="button" className="btn common-btn">Save Address</button>
                   </div>
                </div>
             </div>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
             <div className="checkout-review-order-table-wrapper">
                <div className="title-product-name">Product</div>
                <div className="shop_table ">
                   <div className="cart_item-ccheck">
                      <div className="info-product">
                         <div className="product-thumble">
                            <img width="50"  src={productIMg.src} className="imd-fluid" alt="" />
                         </div>
                         <div className="product-name">
                            Bold Hoops&nbsp; <strong className="product-quantity">QTY : 1</strong>
                         </div>
                      </div>
                      <div className="product-total">
                         <span className=" amount"><bdi><span className="Price-currencySymbol">$</span>120.00</bdi></span>
                      </div>
                   </div>
                   <div className="cart-subtotal-list">
                      <h2>Subtotal</h2>
                      <div className="subtotal-price"><span className="Price-amount amount"><bdi><span
                                  className="Price-currencySymbol">$</span>120.00</bdi></span>
                      </div>
                   </div>
                   <div className="cart-subtotal-list shipping-totals">
                      <h2>Shipping</h2>
                      <div data-title="Shipping">
                         <ul id="shipping_method" className="shipping-methods">
                            <li>
                               <input type="radio" name="shipping_method[0]" data-index="0"
                                  id="shipping_method_0_free_shipping1" value="free_shipping:1"
                                  className="shipping_method" checked="checked" /><label
                                  for="shipping_method_0_free_shipping1">Free shipping</label>
                            </li>
                            <li>
                               <input type="radio" name="shipping_method[0]" data-index="0"
                                  id="shipping_method_0_flat_rate2" value="flat_rate:2" className="shipping_method" /><label
                                  for="shipping_method_0_flat_rate2">Flat
                                  rate</label>
                            </li>
                         </ul>
                      </div>
                   </div>
                   <div className="cart-subtotal-list order-total">
                      <h2>Total</h2>
                      <div className="total-price"><strong><span className="amount"><bdi><span
                                     className="Price-currency">$</span>120.00</bdi></span></strong>
                      </div>
                   </div>
                </div>
                <div id="payment" className="checkout-payment">
                   <ul className=" payment_methods methods">
                      <li className=" payment_method_bacs">
                         <input id="payment_method_bacs" type="radio" className="input-radio" name="payment_method"
                            value="bacs" checked="checked" data-order_button_text="" />
                         <label for="payment_method_bacs">
                            Direct bank transfer </label>
                         <div className="payment_box payment_method_bacs">
                            <p>Make your payment directly into our bank account. Please use your Order ID as
                               the
                               payment reference. Your order will not be shipped until the funds have
                               cleared in
                               our account.
                            </p>
                         </div>
                      </li>
                      <li className=" payment_method_cheque">
                         <input id="payment_method_cheque" type="radio" className="input-radio" name="payment_method"
                            value="cheque" data-order_button_text="" />
                         <label for="payment_method_cheque">
                            Check payments </label>
                      </li>
                      <li className="payment_method_cod&quot;">
                         <input id="payment_method_cod" type="radio" className="input-radio" name="payment_method"
                            value="cod" data-order_button_text="" />
                         <label for="payment_method_cod">
                            Cash on delivery </label>
                      </li>
                      <li className=" payment_method_paypal">
                         <input id="payment_method_paypal" type="radio" className="input-radio" name="payment_method"
                            value="paypal" data-order_button_text="Proceed to PayPal" />
                         <label for="payment_method_paypal">
                            PayPal <img src="images/payment.png" alt="PayPal acceptance mark"/><a href="#"
                               className="about_paypal"></a>
                         </label>
                      </li>
                   </ul>
                   <div className="form-row place-order">
                      <button type="submit" className="button btn-place-order common-btn">Place order</button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </section>
  )
}

export default Page
import React from 'react'
import productIMg from '@/public/assets/image/banner_img.png'
import Link from 'next/link'

const Page = () => {
  return (
    <section className="cart-details-list section-padding">
    <div className=" container-xxl container-xl container-lg container-md container-sm container">
       <div className="row">
          <div className="row">
             <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                <form className="cart-form table-responsive" action="#" method="post">
                   <table className="shop_table  cart " cellspacing="0">
                      <thead>
                         <tr>
                            <th className="product-thumbnail">Product</th>
                            <th className="product-price">Price</th>
                            <th className="product-quantity">Quantity</th>
                            <th className="product-subtotal">Subtotal</th>
                            <th className="product-remove">&nbsp;</th>
                         </tr>
                      </thead>
                      <tbody>
                         <tr className="cart_item">
                            <td className="product-thumbnail">
                               <a href="#"><img src={productIMg.src} width="50" alt=""/></a>
                               <div className="product-name">
                                  <a href="#">Bold
                                     Hoops</a>
                               </div>
                            </td>
                            <td className="product-price">
                               <span className=" amount"><bdi><span className="currencySymbol">$</span>120.00</bdi></span>
                            </td>
                            <td className="product-quantity">
                               <div className="qty-input quantity">
                                  <button className="qty-count qty-count--minus minus" data-action="minus"
                                     type="button">-</button>
                                  <input className="product-qty" type="number" name="product-qty" min="0" max="10"
                                     value="1"/>
                                  <button className="qty-count qty-count--add plus" data-action="add"
                                     type="button">+</button>
                               </div>
                            </td>
                            <td className="product-subtotal" data-title="Subtotal">
                               <span className="amount"><bdi><span className="currencySymbol">$</span>120.00</bdi></span>
                            </td>
                            <td className="product-remove">
                               <a href="#" className="remove"><i className="fa-solid fa-trash"></i>
                               </a>
                            </td>
                         </tr>
                         <tr>
                            <td colspan="6" className="actions">
                               <div className="bottom-cart">
                                  <div className="coupon">
                                     <input type="text" name="coupon_code" className="input-text" id="coupon_code"
                                        value="" placeholder="Coupon code"/> <button type="submit" className="button"
                                        name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                  </div>
                                  <h2><a href="#">Continue
                                        Shopping</a>
                                  </h2>
                                  <button type="submit" className="button" name="update_cart" value="Update cart"
                                     disabled="">Update cart</button>
                               </div>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </form>
             </div>
             <div className="col-xl-4 col-lg-12 col-md-12 col-12">
                <div className="cart-collaterals">
                   <div className="cart_totals ">
                      <h2>Cart totals</h2>
                      <div cellspacing="0" className="shop_table shop_table_responsive">
                         <div className="cart-subtotal">
                            <div className="title">Subtotal</div>
                            <div data-title="Subtotal"><span className="amount"><bdi><span
                                        className="Price-currencySymbol">$</span>120.00</bdi></span>
                            </div>
                         </div>
                         <div className="shipping shipping-totals">
                            <h2>Shipping</h2>
                            <div data-title="Shipping">
                               <ul id="shipping_method" className="">
                                  <li>
                                     <input type="radio" className="shipping_method" checked="checked" /><label>Free
                                        shipping</label>
                                  </li>
                                  <li>
                                     <input type="radio" className="shipping_method" /><label>Flat
                                        rate</label>
                                  </li>
                               </ul>
                            </div>
                         </div>
                         <div className="order-total">
                            <div className="title">Total</div>
                            <div data-title="Total"><strong><span className="amount"><bdi><span
                                           className="Price-currencySymbol">$</span>120.00</bdi></span></strong>
                            </div>
                         </div>
                      </div>
                      <div className="checkout-btn">
                        <Link href="/checkout">Proceed to checkout</Link>
                        
                      </div>
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
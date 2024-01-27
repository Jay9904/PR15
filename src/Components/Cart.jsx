import React, { useEffect, useState } from 'react'
import Header from './Header'
import { FaMapLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ItemCart from './ItemCart';
import { useNavigate } from 'react-router';

export default function Cart() {
  const [input, setInput] = useState({ houseNo: '', address: '', type: "" });
  const [error, setError] = useState({});
  const currentUser = useSelector((state) => state.currentUser);
  const [userAddress, setUserAddress] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [gst, setGst] = useState(0);

  useEffect(() => {
    if (currentUser && currentUser[0] && currentUser[0].address) {
      setUserAddress(currentUser[0].address);
      let id = currentUser[0].id;
      fetch(`http://localhost:8000/cart?userId=${id}`)
        .then((response) => response.json())
        .then((json) => setCartItems(json))
    }
  }, [currentUser])

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      let data = currentUser[0];
      let id = data.id;
      fetch(`http://localhost:8000/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, "address": input }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((json) => dispatch({
        type: 'UPDATEUSER',
        payload: json
      }))
      fetch(`http://localhost:8000/cuurentUser/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, "address": input }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(
        Swal.fire({
          icon: 'success',
          title: 'Address Save SuccessFully'
        })
      )
    }
  }

  const validation = () => {
    const newError = {};
    let valid = true;
    if (input.houseNo.trim() === "") {
      newError.houseNo = "Required!";
      valid = false;
    }
    if (input.address.trim() === "") {
      newError.address = "Required!";
      valid = false;
    }
    if (input.type.trim() === "") {
      newError.type = "Required!";
      valid = false;
    }
    setError(newError);
    return valid;
  }

  const updateTotalAmount = (newTotalAmount) => {
    setTotalAmount(newTotalAmount);
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date} / ${month} / ${year}`;
  }

  function getTime() {
    const today = new Date();
    const hours = today.getHours() + 1;
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    return `${hours} : ${minutes} : ${seconds}`;
  }

  const handleOrder = async () => {
    try {
      if (cartItems.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Cart is Empty!!!"
        });
      } else {
        let date = getDate();
        let time = getTime();

        const orderResponse = await fetch('http://localhost:8000/totalGetOrders', {
          method: 'POST',
          body: JSON.stringify({ cartItems, userAddress, date, time, status: "active" }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        if (orderResponse.ok) {
          await Swal.fire({
            icon: "success",
            title: 'Your Order Placed Successfully'
          });

          // Delete items from cart after placing the order
          await Promise.all(cartItems.map(async (item) => {
            await fetch(`http://localhost:8000/cart/${item.id}`, {
              method: 'DELETE',
            });
          }));

          // Navigate to orderlist
          navigate('/orderlist');
        } else {
          Swal.fire({
            icon: "error",
            title: 'Failed to place the order. Please try again.'
          });
        }
      }
    } catch (error) {
      console.error('Error handling order:', error);
      Swal.fire({
        icon: "error",
        title: 'Failed to place the order. Please try again.'
      });
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-8 bg-light p-3">
            <h3 className='fw-bolder fs-5 d-flex align-items-center gap-3'><span className='border border-dark rounded text-center p-2 bg-dark'><FaMapLocationDot className=' fs-3 text-warning' /></span>Add Your Delivery Address</h3>

            <div className='mt-4'>
              <button className="hamarabtnPrime" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Add New Address</button>
              {
                userAddress && <>
                  <div className='border border-dark border-2 col-6 p-3 mt-3 fw-semibold'>
                    <p className='fs-5 fw-bold'>Type : {userAddress.type}</p>
                    <p>House No : {userAddress.houseNo}</p>
                    <p>Street / Landmark : {userAddress.address}</p>
                    <button className='hamarabtnPrime'>Use this address</button>
                  </div>
                </>
              }
              {/* canvas */}
              <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title fw-bolder" id="offcanvasWithBothOptionsLabel">Save Delivery Address</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body" onSubmit={handleSubmit}>
                  <form action="" className='row gap-3 px-3'>
                    <div>
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238132.6728888523!2d72.65748223205493!3d21.15944056645878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1705128629979!5m2!1sen!2sin" className='w-100' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div>
                      {error.houseNo && <span className='text-danger'>{error.houseNo}</span>}
                      <input
                        type="text"
                        name='houseNo'
                        value={input.houseNo}
                        className='form-control border border-dark'
                        placeholder='Dore / Flat No'
                        onChange={handleInput}
                      />
                    </div>
                    <div>
                      {error.address && <span className='text-danger'>{error.address}</span>}
                      <input
                        type="text"
                        name='address'
                        value={input.address}
                        className='form-control border border-dark'
                        placeholder='landmark'
                        onChange={handleInput}
                      />
                    </div>
                    <div>
                      {error.type && <span className='text-danger'>{error.type}</span>}
                      <select name="type" value={input.type} id="" className='form-control border border-dark' onChange={handleInput}>
                        <option value="">Address Type</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                      </select>
                    </div>
                    <button className='hamarabtnPrime'>Save Address & Proceed</button>
                  </form>
                </div>
              </div>
              {/* canvas */}
            </div>

          </div>
          <div className="col-4 bg-light p-3 shadow">
            {cartItems ? <div>
              <h4>Hotel name</h4>
              <p>Address</p>
            </div> : <p className='fw-bolder'>NO ITEMS IN CART...</p>}

            <div>
              {
                cartItems && cartItems.map((item, index) => {
                  return <>
                    <ItemCart item={item} key={item.id} updateTotalAmount={updateTotalAmount} setGst={setGst} />
                  </>
                })
              }
            </div>
            <div>
              <form action="">
                <input
                  type="text"
                  className='form-control my-2 border border-dark border-3'
                  placeholder='Instruction'
                />
              </form>
            </div>
            <div>
              <button className='hamarabtnSecond w-100'>Apply Coupon</button>
            </div>
            <div className='mt-2 p-2'>
              <p className='fw-semibold'>Bill Details</p>
              <div className='d-flex justify-content-between'>
                <span>Item Total</span>
                <span>{totalAmount}</span>
              </div>
              <div className='d-flex justify-content-between my-2'>
                <span>GST and Charges</span>
                <span>{gst}</span>
              </div>
              <hr />
              <div className='d-flex justify-content-between my-2 fs-5'>
                <p className='fw-bold'>To Pay Total</p>
                <span className='fw-bold'>{totalAmount + gst}</span>
              </div>
            </div>
            <button className='hamarabtnPrime w-100' onClick={handleOrder}>PROCEED FOR ORDER</button>
          </div>
        </div>
      </div>
    </>
  )
}

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Header() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUser);
    // console.log(currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('http://localhost:8000/cuurentUser')
            .then((response) => response.json())
            .then((json) => dispatch({
                type: "addCurrentUser",
                payload: json
            }));
    }, [])

    const handleLogout = () => {
        const id = currentUser[0].id;
        fetch(`http://localhost:8000/cuurentUser/${id}`, {
            method: 'DELETE',
        }).then(
            Swal.fire({
                icon: 'success',
                title: 'Log Out SuccessFully'
            }),
            navigate('/userlogin')
        )
    }

    const handleCart = () => {
        navigate('/cart')
    }


    return (
        <header>
            <nav className="navbar navbar-expand-lg shadow ">
                <div className="container">
                    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                        <div className='col-3 text-center'>
                            {/* <marquee direction="left" behavior="scroll" className=''> */}
                            <Link to={'/'}><img src="/logo.jpg" alt="" className='img-fluid w-25' /></Link>
                            {/* </marquee> */}
                        </div>
                        <div className='col-6'>
                            <form action="" className='shadow d-flex'>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Your Location'
                                />
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Find Your restaurant, cuisine'
                                />
                            </form>
                        </div>
                        <div className='col-3 text-center'>

                            {
                                currentUser ?
                                    <div className="dropdown">
                                        <button className="hamarabtnPrime dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Menu
                                        </button>
                                        <ul className="dropdown-menu p-0 ">
                                            <li><a className="dropdown-item hamarabtnSecond">Pofile</a></li>
                                            <li><Link to={'/orderlist'} className="dropdown-item hamarabtnSecond" >Order List</Link></li>
                                            <li><a className="dropdown-item hamarabtnSecond" onClick={handleCart}>Cart</a></li>
                                            <li><a className="dropdown-item hamarabtnSecond" onClick={handleLogout}>Log Out</a></li>
                                        </ul>
                                    </div>
                                    : <>
                                        <Link to={'/userlogin'} className='hamarabtnPrime me-2' >Login</Link>
                                        <Link to={'/usersignup'} className='hamarabtnSecond' >Sign Up</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

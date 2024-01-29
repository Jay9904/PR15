import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import database from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

export default function UserSignup() {
    const [input, setInput] = useState({ name: "", address: "", mobileNo: "", email: "", password: '' });
    const [error, setError] = useState({});
    const navigate = useNavigate()
    const db = database;
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users)

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validation()) {
            let emailVerification = users.filter((item) => item.email === input.email);

            if (emailVerification.length > 0) {
                Swal.fire({
                    title: "Email Already Registered"
                });
            } else {
                try {
                    const response = await fetch('http://localhost:8000/users', {
                        method: 'POST',
                        body: JSON.stringify(input),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    });

                    if (response.ok) {
                        await Swal.fire({
                            icon: "success",
                            title: "Registration Successfully Done"
                        });
                        navigate('/userlogin');
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Registration Failed"
                        });
                    }
                } catch (error) {
                    console.error('Error during registration:', error);
                    Swal.fire({
                        icon: "error",
                        title: "Registration Failed"
                    });
                }
            }
        }
    };


    const validation = () => {
        const newError = {};
        let valid = true;
        if (input.name.trim() === "") {
            newError.name = "Required!";
            valid = false;
        }
        if (input.address.trim() === "") {
            newError.address = "Required!";
            valid = false;
        }
        if (input.mobileNo.trim() === "") {
            newError.mobileNo = "Required!";
            valid = false;
        }
        if (input.email.trim() === "") {
            newError.email = "Required!";
            valid = false;
        }
        if (input.password.trim() === "") {
            newError.password = "Required!";
            valid = false;
        }
        setError(newError);
        return valid;
    }

    return (
        <div className="vh100 align-items-center row justify-content-center p-0 m-0">
            <h4 className='text-center fw-semibold'>Just Giving You A <span className='text-warning bg-dark px-3 py-1 border-bottom border-warning border-4 fs-5'>Star ⭐</span> For not wasting food. thank You!😊</h4>
            <div className='col-6'>
                <img src="/main.jpg" alt="" className='img-fluid' />
            </div>
            <div className='col-6'>
                <form action="" className='border-dark border border-3 p-3 rounded col-10 m-auto' onSubmit={handleSubmit}>
                    <p className='fs-4 fw-bolder'>Register Your Self</p>
                    <input
                        type="text"
                        className='form-control border-dark mt-3'
                        placeholder='Full Name'
                        name='name'
                        onChange={handleInput}
                    />
                    {error.name && <span className='text-danger'>{error.name}</span>}
                    <textarea
                        className='form-control border-dark mt-3'
                        placeholder='Full Address'
                        name='address'
                        onChange={handleInput}
                    />
                    {error.address && <span className='text-danger'>{error.address}</span>}
                    <input
                        type="number"
                        className='form-control border-dark mt-3'
                        placeholder='Mobile Number'
                        name='mobileNo'
                        onChange={handleInput}
                    />
                    {error.mobileNo && <span className='text-danger'>{error.mobileNo}</span>}
                    <input
                        type="email"
                        className='form-control border-dark mt-3'
                        placeholder='Email Address'
                        name='email'
                        onChange={handleInput}
                    />
                    {error.email && <span className='text-danger'>{error.email}</span>}
                    <input
                        type="password"
                        className='form-control border-dark mt-3'
                        placeholder='Password'
                        name='password'
                        onChange={handleInput}
                    />
                    {error.password && <span className='text-danger'>{error.password}</span>}
                    <button className='hamarabtnPrime mt-3 w-100 ' type='submit'>Submit</button>
                    <hr className='border border-dark border-2' />
                    <Link to={'/userlogin'} className='hamarabtnSecond w-100'>Alredy Register / Log in</Link>
                </form>
            </div>
        </div>
    )
}

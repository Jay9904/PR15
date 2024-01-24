import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import database from '../firebase';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';



export default function Registration() {
    const [input, setInput] = useState({ restaurantName: "", restaurantAddress: "", ownerName: "", mobileNo: "", email: "", fssai: "", gstNo: '', password: '' });
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const db = database;

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation()) {
            fetch('http://localhost:8000/restaurants', {
                method: 'POST',
                body: JSON.stringify(input),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            Swal.fire({
                icon: "success",
                title: "Registeration Successfully Done"
            })
            navigate('/login')
        }
    }

    // validation
    const validation = () => {
        const newError = {};
        let valid = true;
        if (input.restaurantName.trim() === "") {
            newError.restaurantName = "Required!";
            valid = false;
        }
        if (input.restaurantAddress.trim() === "") {
            newError.restaurantAddress = "Required!";
            valid = false;
        }
        if (input.ownerName.trim() === "") {
            newError.ownerName = "Required!";
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
        if (input.fssai.trim() === "") {
            newError.fssai = "Required!";
            valid = false;
        }
        if (input.gstNo.trim() === "") {
            newError.gstNo = "Required!";
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
            <form action="" className='border-dark border border-3 p-3 col-6 rounded' onSubmit={handleSubmit}>
                <p className='fs-4 fw-bolder'>Restaurant Registration</p>
                <input
                    type="text"
                    placeholder='Restaurant Name'
                    name='restaurantName'
                    className='form-control border border-dark'
                    onChange={handleInput}
                />
                {error.restaurantName && <span className='text-danger'>{error.restaurantName}</span>}
                <textarea
                    className='form-control border-dark mt-3'
                    placeholder='Restaurant Full Address'
                    name='restaurantAddress'
                    onChange={handleInput}
                />
                {error.restaurantAddress && <span className='text-danger'>{error.restaurantAddress}</span>}
                <input
                    type="text"
                    className='form-control border-dark mt-3'
                    placeholder='Owner Full Name'
                    name='ownerName'
                    onChange={handleInput}
                />
                {error.ownerName && <span className='text-danger'>{error.ownerName}</span>}
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
                    type="text"
                    className='form-control border-dark mt-3'
                    placeholder='FSSAI Licence'
                    name='fssai'
                    onChange={handleInput}
                />
                {error.fssai && <span className='text-danger'>{error.fssai}</span>}
                <input
                    type="text"
                    className='form-control border-dark mt-3'
                    placeholder='GST Number'
                    name='gstNo'
                    onChange={handleInput}
                />
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
                <Link to={'/login'} className='hamarabtnSecond w-100'>Alredy Register / Log in</Link>
            </form>
        </div>
    )
}

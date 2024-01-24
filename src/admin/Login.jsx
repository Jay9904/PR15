import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import database from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'


export default function Registration() {
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState({});
    const db = database;
    const dispatch = useDispatch();
    const resturentsList = useSelector((state) => state.restaurants);
    const navigate = useNavigate()


    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetch('http://localhost:8000/restaurants')
            .then((response) => response.json())
            .then((json) => dispatch({
                type: "getResList",
                payload: json
            }));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation()) {
            const loginUser = resturentsList.filter((item) => item.email === input.email && item.password === input.password);
            if (loginUser.length === 1) {
                fetch('http://localhost:8000/adminUser', {
                    method: 'POST',
                    body: JSON.stringify(...loginUser),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }).then(
                    Swal.fire({
                        icon: 'success',
                        title: 'Log In Successfully'
                    })
                ).then(
                    navigate('/dashboard')
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Id and Password'
                })
            }
        }
    }

    // validation
    const validation = () => {
        const newError = {};
        let valid = true;
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
            <form action="" className='border-dark border border-3 p-3 col-6 rounded' onSubmit={handleSubmit}>
                <p className='fs-4 fw-bolder'>Restaurant Login</p>
                <input
                    type="email"
                    className='form-control border-dark mt-3'
                    placeholder='Email'
                    name='email'
                    onChange={handleInput}
                />
                {error.mobileNo && <span className='text-danger'>{error.mobileNo}</span>}
                <input
                    type="password"
                    className='form-control border-dark mt-3'
                    placeholder='Password'
                    name='password'
                    onChange={handleInput}
                />
                {error.password && <span className='text-danger'>{error.password}</span>}
                <button className='hamarabtnPrime mt-3 w-100 ' type='submit'>Login</button>
                <hr className='border border-dark border-2' />
                <Link to={'/signup'} className='hamarabtnSecond w-100'>Registeration As a new Resturent</Link>
            </form>
        </div>
    )
}

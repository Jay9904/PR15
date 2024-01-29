import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';


export default function Userlogin() {
    const [input, setInput] = useState({ email: "", password: '' });
    const [error, setError] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users);

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/users');
                const json = await response.json();
                dispatch({
                    type: "UserList",
                    payload: json,
                });
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validation()) {
            const loginUser = users.filter((item) => item.email === input.email && item.password === input.password);

            if (loginUser.length === 1) {
                try {
                    const response = await fetch('http://localhost:8000/cuurentUser', {
                        method: 'POST',
                        body: JSON.stringify(...loginUser),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    });
                    if (response.ok) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Log In Successfully'
                        });
                        navigate('/restaurant');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to Log In'
                        });
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Id and Password'
                });
            }
        }
    };


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
            {/* <svg viewBox="0 0 1320 300">
                <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                    FOOD...
                </text>
            </svg> */}
            <div>
                <h4 className='text-center fw-semibold'>Just Giving You A <span className='text-warning bg-dark px-3 py-1 border-bottom border-warning border-4 fs-4'>Star ⭐</span> For not wasting food. thank You!😊</h4>
            </div>
            <div className='col-6'>
                <img src="/main.jpg" alt="" className='img-fluid' />
            </div>
            <div className='col-6'>
                <form action="" className='border-dark border border-3 p-3 rounded col-10 m-auto' onSubmit={handleSubmit}>
                    <p className='fs-4 fw-bolder'>Log In</p>
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
                    <button className='hamarabtnPrime mt-3 w-100 ' type='submit'>Log In</button>
                    <hr className='border border-dark border-2' />
                    <Link to={'/usersignup'} className='hamarabtnSecond w-100'>New User</Link>
                </form>
            </div>
        </div>
    )
}

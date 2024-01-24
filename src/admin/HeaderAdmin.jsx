import React from 'react'
import { IoMdNotifications } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export default function HeaderAdmin() {
    const navigate = useNavigate()
    const adminUser = useSelector((state) => state.adminUser);

    const handleLogout = () => {
        const id = adminUser[0].id;
        fetch(`http://localhost:8000/adminUser/${id}`, {
            method: 'DELETE',
        }).then(
            Swal.fire({
                icon: 'success',
                title: 'Log Out SuccessFully'
            }),
            navigate('/login')
        )
    }

    return (
        <header>
            <div className='container py-2 m-auto d-flex'>
                <div className='col-8'>
                    <form action="" className='d-flex gap-2'>
                        <input
                            type="text"
                            className='form-control border-dark'
                            placeholder='Search'
                        />
                        <button className='hamarabtnPrime'>Search</button>
                    </form>
                </div>
                <div className='col-4 text-center mt-1'>
                    <IoMdNotifications className='fs-3 me-3' id='icon' />
                    <IoPersonAdd className='fs-4 me-3' id='icon' />
                    <button className='hamarabtnPrime' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </header>
    )
}

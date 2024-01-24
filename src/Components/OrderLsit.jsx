import React, { useEffect, useState } from 'react'
import Header from './Header'
import Swal from 'sweetalert2';


export default function OrderLsit() {
    const [orderData, setOrderData] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:8000/totalGetOrders')
            .then((response) => response.json())
            .then((json) => setOrderData(json));
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                let id = item.id;
                fetch(`http://localhost:8000/totalGetOrders/${id}`, {
                    method: 'DELETE',
                }).then(
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    })
                ).then(fetchData());
            }
        });
    }

    return (
        <>
            <Header />
            <div className="container mt-3">
                <h3 className='fw-bolder'>Your Order List</h3>
                <table className='table table-hove table-warning' border={3}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderData && orderData.map((item, index) => {
                                return <>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>bill</td>
                                        <td><span className='badge text-bg-primary'>{item.status}</span></td>
                                        <td><button className='badge text-bg-danger btn' onClick={() => handleDelete(item)}>Cancel Order</button></td>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

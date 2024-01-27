import React, { useEffect, useState } from 'react'
import Header from './Header'
import Swal from 'sweetalert2';

export default function OrderLsit() {
    const [orderData, setOrderData] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/totalGetOrders');
            const json = await response.json();
            setOrderData(json);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    const handleDelete = async (item) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this item!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const id = item.id;

                await fetch(`http://localhost:8000/totalGetOrders/${id}`, {
                    method: 'DELETE',
                });

                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });

                fetchData(); // Refresh data after deletion
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete the order. Please try again.',
                icon: 'error'
            });
        }
    };

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

import React, { useEffect, useState } from 'react'
import FirstLettercapital from './FirstLettercapital';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';


export default function ItemCart({ item, updateTotalAmount, setGst }) {
    const [itemCount, setItemCount] = useState(1);
    const [price, setPrice] = useState(parseInt(item.item.price));
    const [totalAmount, setTotalAmount] = useState(parseInt(item.item.price));

    useEffect(() => {
        // console.log(itemCount)
        const newTotalAmount = parseInt(item.item.price) * itemCount;
        setTotalAmount(newTotalAmount);
        updateTotalAmount(newTotalAmount);
        let gstAmount = newTotalAmount * 9 / 100;
        setGst(gstAmount);
    }, [itemCount, item.item.price, updateTotalAmount]);

    const handleCountPlus = () => {
        setItemCount(itemCount + 1);
        setPrice(price + parseInt(item.item.price));
    }

    const handleCountMinus = () => {
        if (itemCount > 1) {
            setItemCount(itemCount - 1);
            setPrice(price - parseInt(item.item.price));
        }
    }

    const handleRemove = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this item!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const id = item.id;
                const response = await fetch(`http://localhost:8000/cart/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } else {
                    await Swal.fire({
                        title: "Error",
                        text: "Failed to delete the item. Please try again.",
                        icon: "error"
                    });
                }
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to delete the item. Please try again.",
                icon: "error"
            });
        }
    };


    return (
        <div className='border border-dark p-2'>
            <div className='d-flex justify-content-between align-items-center'>
                <p className='fw-bolder fs-5'>{FirstLettercapital(item.item.itemName)}</p>
                <p className='fw-semibold'>Price : {totalAmount}</p>
            </div>
            <div className='d-flex align-items-center'>
                <div class="btn-group col" role="group">
                    <button type="button" class="hamarabtnSecond px-3" onClick={handleCountMinus} >-</button>
                    <button type="button" class="px-3 ">{itemCount}</button>
                    <button type="button" class="hamarabtnSecond px-3" onClick={handleCountPlus}>+</button>
                </div>
                <button className='hamarabtnSecond p-2 fs-6' onClick={() => handleRemove(item)}>Remove</button>
            </div>
        </div>
    )
}

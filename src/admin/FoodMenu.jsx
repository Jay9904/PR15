import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';


export default function FoodMenu() {
    const [input, setInput] = useState({ category: "", itemName: "", price: "" });
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const user = useSelector((state) => state.adminUser);
    const menu = useSelector((state) => state.adminMenu);

    useEffect(() => {
        const id = user[0].id;
        fetch(`http://localhost:8000/restaurantMenu?resId=${id}`)
            .then((response) => response.json())
            .then((json) => dispatch({
                type: "fatchadminMenu",
                payload: json
            }));
    }, [])

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation()) {
            const resId = user[0].id;
            fetch(`http://localhost:8000/restaurantMenu`, {
                method: 'POST',
                body: JSON.stringify({ ...input, resId }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(Swal.fire({
                icon: "success",
                title: "Item Added successfully"
            }))

        }
    }

    const validation = () => {
        const newError = {};
        let valid = true;
        if (input.category.trim() === "") {
            newError.category = "Required!";
            valid = false;
        }
        if (input.itemName.trim() === "") {
            newError.itemName = "Required!";
            valid = false;
        }
        if (input.price.trim() === "") {
            newError.price = "Required!";
            valid = false;
        }
        setError(newError);
        return valid;
    }

    const handleDelete = (index) => {
        console.log(index);
    }

    return (
        <section>
            <div className="container mt-2">
                <button className='hamarabtnPrime '>Add Item In Your Menu</button>
                <div className='py-4 px-3 border border-dark my-3' >
                    <form action="" className='d-flex gap-2 align-items-center' onSubmit={handleSubmit}>
                        <div className='col'>
                            {error.category && <span className='text-danger'>{error.category}</span>}
                            <select name="category" value={input.category} id="" className='form-control border-dark' onChange={handleInput}>
                                <option value="">Food Catagery</option>
                                <option value="salad">Salad</option>
                                <option value="italian">Italian</option>
                                <option value="North Indian">North Indian</option>
                                <option value="South Indian">South Indian</option>
                                <option value="Meal">Meal</option>
                                <option value="Desert">Desert</option>
                                <option value="Rice">Rice</option>
                                <option value="Chinies">Chinies</option>
                            </select>
                        </div>
                        <div className='col'>
                            {error.itemName && <span className='text-danger'>{error.itemName}</span>}
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={input.itemName}
                                name='itemName'
                                className='form-control border-dark'
                                onChange={handleInput}
                            />
                        </div>
                        <div className='col'>
                            {error.price && <span className='text-danger'>{error.price}</span>}
                            <input
                                type="number"
                                placeholder='Price'
                                name='price'
                                value={input.price}
                                className='form-control border-dark'
                                onChange={handleInput}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Add"
                            className='hamarabtnPrime'
                        />
                    </form>
                </div>
                {/* food menu table */}
                <table className='table table-light mt-3'>
                    <thead>
                        <tr>
                            <th>Catagery</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu && menu.map((item, index) => {
                                return <>
                                    <tr key={index}>
                                        <td>{item.category.toUpperCase()}</td>
                                        <td>{item.itemName.toUpperCase()}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button className='hamarabtnPrime px-4 py-1 me-2'>Edit</button>
                                            <button className='hamarabtnSecond px-4 py-1' onClick={() => handleDelete(index)}>Delete</button>
                                        </td>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </table>
            </div>

        </section>
    )
}

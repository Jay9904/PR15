import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router';
import FirstLettercapital from './FirstLettercapital';
import Swal from 'sweetalert2';


export default function Menu() {
    const restaurantList = useSelector((state) => state.restaurants);
    const id = useParams();
    const restaurant = restaurantList.filter((item) => item.id === id.id);
    const [data, setData] = useState(...restaurant);
    const [resMenu, setResMenu] = useState();
    const [cart, setCart] = useState([]);
    const clintUser = useSelector((state) => state.currentUser);
    const [alredyinCart, setAlredyinCart] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await fetchCart();
            await fetchMenu();
            if (resMenu) {
                filterCart();
            }
        };
        fetchData();
    }, [])

    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:8000/cart`);
            const json = await response.json();
            setCart(json);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const fetchMenu = async () => {
        try {
            const response = await fetch(`http://localhost:8000/restaurantMenu?resId=${id.id}`);
            const json = await response.json();
            setResMenu(json);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    };


    const filterCart = () => {
        let items = [];
        for (const obj1 of resMenu) {
            for (const obj2 of cart) {
                if (obj1.id === obj2.item.id) {
                    items.push(obj1.id);
                }
            }
        }
        setAlredyinCart(items);
    }

    const handleShare = () => {
        const url = window.location.href;
        alert(url + ' Url Copy Successfully')
    }

    const addToCart = async (item) => {
        try {
            const userId = clintUser[0].id;
            const data = { item, userId };
            let resId = cart && cart.some((item) => item.item.resId === data.item.resId);

            if (resId === true || cart.length === 0) {
                let id = cart && cart.some((item) => item.item.id === data.item.id);
                console.log(true);
                if (id === true) {
                    Swal.fire({
                        icon: "warning",
                        title: "Item Already in cart"
                    });
                } else {
                    const response = await fetch('http://localhost:8000/cart', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    });

                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: "Item in your cart"
                        });
                        await fetchCart();
                    } else {
                        console.error(`Error: ${response.statusText}`);
                    }
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "You can't order with two restaurants at the same time"
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <p className='container mt-3'>Home / Gujarat / Surat / Adajan</p>
            <div className="container d-flex col-10">
                <div className='col'>
                    {
                        data && <>
                            <h2>{data.restaurantName}</h2>
                            <p>{FirstLettercapital(data.restaurantAddress)}</p>
                        </>
                    }
                    <p>Time</p>
                    <div>
                        <button className='hamarabtnPrime me-2'>Direction</button>
                        <button className='hamarabtnSecond' onClick={handleShare}>Share</button>
                    </div>
                </div>
                <div>
                    <h5>
                        <span className='badge text-bg-warning me-2'>4.5</span>
                        <span className='badge text-bg-success fw-medium'>400 Ratting</span>
                    </h5>
                </div>
            </div>
            <hr className='border border-dark border-3' />
            <div className="container col-8">
                {
                    resMenu && resMenu.map((item, index) => {
                        return <>
                            <div className='item-card' key={index}>
                                <div className='d-flex align-items-center'>
                                    <div className='col'>
                                        <h3 className='fs-4 fw-bolder'>{FirstLettercapital(item.itemName)}</h3>
                                        <p className='fw-bolder'>{item.price} /-</p>
                                        <p className='text-muted '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolorum quo dignissimos cum assumenda voluptates necessitatibus exercitationem ipsum aliquam tempora?</p>
                                    </div>
                                    <div className='col-2 position-relative shadow-lg'>
                                        <img src="/food.jpg" alt="" className='img-fluid rounded-3' />
                                        <button className='hamarabtnPrime py-1 position-absolute top-100 start-50 translate-middle' onClick={() => addToCart(item)}>Add</button>
                                    </div>
                                </div>
                                <hr className='border border-dark mt-5' />
                            </div>
                        </>
                    })
                }
            </div>
        </>
    )
}

import React, { useEffect } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


export default function Restaurant() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const restaurants = useSelector((state) => state.restaurants);
    // console.log(menu);

    useEffect(() => {
        fetch('http://localhost:8000/restaurants')
            .then((response) => response.json())
            .then((json) => dispatch({
                type: "getResList",
                payload: json
            }));
    }, [])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleMenu = (item) => {
        const id = item.id;
        navigate(`/menu/${id}`)
    }

    return (
        <>
            <Header />
            <div className='container mt-3'>
                <h2 className='fw-bold'>Restaurants with online food delivery...</h2>
                <div className='row row-cols-4 g-2'>
                    {
                        restaurants && restaurants.map((item, index) => {
                            return <>
                                <div className='p-3' key={index}>
                                    <div className="card col shadow">
                                        <img src="/banner.jpg" alt="Resturant logo" className='card-img-top ' />
                                        <div className="card-body">
                                            <h5 className='card-title'>{capitalizeFirstLetter(item.restaurantName)}</h5>
                                            <p className='card-text'>{capitalizeFirstLetter(item.restaurantAddress)}</p>
                                            <button className='hamarabtnPrime px-3 py-1' onClick={() => handleMenu(item)}>View Menu</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })
                    }
                </div>
            </div>
        </>
    )
}

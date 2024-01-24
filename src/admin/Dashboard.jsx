import React, { useEffect, useState } from 'react'
import HeaderAdmin from './HeaderAdmin'
import Home from './Home'
import FoodMenu from './FoodMenu'
import Order from './Order'
import Report from './Report'


export default function Dashboard() {
    const [component, setComponent] = useState('');
    const [show, setShow] = useState(<Home />);

    useEffect(() => {
        switch (component) {
            case 'home': setShow(<Home />)
                break;
            case 'foodmenu': setShow(<FoodMenu />)
                break;
            case 'order': setShow(<Order />)
                break;
            case 'report': setShow(<Report />)
                break;
            default:
                break;
        }
    }, [component])



    return (
        <>
            <div className="vh100">
                <div className='d-flex vh100'>
                    <div className='col-2 bg-warning-subtle'>
                        <ul className='list-unstyled d-flex flex-column gap-3 mt-3'>
                            <li className='hamarabtnPrime mx-3' onClick={() => setComponent('home')}>Dashboard</li>
                            <li className='hamarabtnPrime mx-3' onClick={() => setComponent('foodmenu')}>Food Menu</li>
                            <li className='hamarabtnPrime mx-3' onClick={() => setComponent('order')}>Order</li>
                            <li className='hamarabtnPrime mx-3' onClick={() => setComponent('report')}>Reports</li>
                        </ul>
                    </div>
                    <div className='col-10'>
                        <HeaderAdmin />
                        {show}
                    </div>
                </div>
            </div>

        </>
    )
}

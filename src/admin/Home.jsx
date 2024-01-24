import React from 'react'

export default function Home() {
    return (
        <div>
            <div className="container">
                <div className="row g-3 row-cols-3">
                    <div className="col">
                        <div className="card border border-dark p-2 border-2" id='dashboardCard'>
                            <h4 className='text-center fw-bold border-bottom border-dark pb-2' >TOTAL ORDER</h4>
                            <h4 className='fs-1 text-center'>0</h4>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card border border-dark p-2 border-2" id='dashboardCard'>
                            <h4 className='text-center fw-bold border-bottom border-dark pb-2' >NEW ORDER</h4>
                            <h4 className='fs-1 text-center'>0</h4>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card border border-dark p-2 border-2" id='dashboardCard'>
                            <h4 className='text-center fw-bold border-bottom border-dark pb-2' >TOTAL FOOD DELIVER</h4>
                            <h4 className='fs-1 text-center'>0</h4>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card border border-dark p-2 border-2" id='dashboardCard'>
                            <h4 className='text-center fw-bold border-bottom border-dark pb-2' >FOOD PICKUP</h4>
                            <h4 className='fs-1 text-center'>0</h4>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card border border-dark p-2 border-2" id='dashboardCard'>
                            <h4 className='text-center fw-bold border-bottom border-dark pb-2' >TOTAL REVENUE</h4>
                            <h4 className='fs-1 text-center'>0</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

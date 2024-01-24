import React from 'react'

export default function Order() {
  return (
    <section>
      <div className="container mt-2">
        <div className='d-flex justify-content-between'>
          <h4>Order List</h4>
          <form action="">
            <select name="orderdate" id="" className='form-control text-center border-dark'>
              <option value="">Todays Orders</option>
              <option value="">Last 7 Days Orders</option>
              <option value="">Last Week Orders</option>
              <option value="">Last Month Orders</option>
              <option value="">All Orders</option>
            </select>
          </form>
        </div>
        <table className='table table-hover border-dark'>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Item List</th>
              <th>Order ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Bhaji</td>
              <td>51515</td>
              <td>jay</td>
              <td>Accept/decline</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

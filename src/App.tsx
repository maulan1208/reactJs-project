import React from 'react';
import logo from './logo.svg';
import './App.css';
import './app.scss';

function App() {
  return (
    <div>
        <h1 className='heading'>User List</h1>
        <div className='container'>
          <button className='btn-create'>Create new user</button>
          <table>
            <tr className='table-heading'>
              <th>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Age</th>
              <th>Department</th>
              <th colSpan={2}>Action</th>
            </tr>

            <tr className='table-content'>
              <td>R6WDLIE</td>
              <td>Nguyễn Mậu Lân</td>
              <td>Lân</td>
              <td>Hà Đông, Hà Nội</td>
              <td>20</td>
              <td>VTI</td>
              <td >
                <a className='btn-edit'>Edit</a>
              </td>
              <td>
                <button className='btn-delete'>Delete</button>
              </td>
            </tr>
          </table>
        </div>
    </div>
  );
}

export default App;

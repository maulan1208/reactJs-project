import React, { useState, useEffect} from "react";
import './user-list.scss'
import { Link } from "react-router-dom";
import axios from 'axios';
import { nanoid } from 'nanoid'
import User from "components/user-edit/UserEdit";

export interface User {
    id: string
    firstName: string
    lastName: string
    age: number,
    address: string,
    department: string
  }

export default function(){
    const [users, setUsers] = useState<Array<User>>([])
    const [fitter, setFitter] = useState<Array<User>>([])
    
    async function fetchUsers() {
        const data = await fetch("http://localhost:3000/users")
        const response = await data.json()
        setUsers(response);
    }

    async function handleDelete(userID: string) {
        await axios.delete(`http://localhost:3000/users/${userID}`)
        fetchUsers()
      }
    
    function Sort(){
        users.sort(users => users.age)
        setFitter(users);
        
    } 

    useEffect(function(){ 
        fetchUsers()
    }, [])

    

    return(
        <>
            <h1 className='heading'>User List</h1>
            <div className='container'>
            <span>
                <Link to="user/create">
                    <button className='btn-create'>Create new user</button>
                </Link>

                <button onClick={Sort}>Sắp xếp</button>
            </span>
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

                {
                    users.map(function (user) {
                        return (
                        <tr className='table-content' key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address}</td>
                            <td>{user.age}</td>
                            <td>{user.department}</td>
                            <td >
                                    <Link to={`edit/${user.id}`} className='btn-edit'>Edit</Link>
                                </td>
                                <td>
                                    <button className='btn-delete' onClick={() => {
                                        handleDelete(user.id)
                                    }} >Delete</button>
                                </td>
                        </tr>
                        )
                    })
                }
                
            </table>
            </div>
        
        </>
    )
}
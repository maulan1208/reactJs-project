import { useEffect, useState } from "react";
import "./user-edit.scss";
import axios from "axios"
import { redirect, useNavigate, useParams } from "react-router-dom";
import { nanoid } from 'nanoid'

export interface UserDetail {
    id: string
    firstName: string
    lastName: string
    age: number,
    address: string,
    department: string
}


export default function User() {
    const [firstName, setFirstName] = useState<string>()
    const [lastName, setLastName] = useState<string>()
    const [address, setAddress] = useState<string>()
    const [age, setAge] = useState<number>()
    const [department, setDepartment] = useState<string>("fpt")
    const [userDetail, setUserDetail] = useState<UserDetail>()
    const [error, setError] = useState<string>("")
    const [errorAge, setErrorAge] = useState<string>("")
    const navigate = useNavigate()
    const params = useParams()

    async function fetchUserDetail() {
        const userDetail = await axios({
            method: "get",
            url: `http://localhost:3000/users/${params.userID}`,
        })
        setUserDetail(userDetail.data)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!firstName?.length || !lastName?.length || !address?.length || !age || !department.length) {
            setError("Please full fill data form!")
        } else if( age > 100 || age < 1 ){
            setErrorAge("Tên từ 1 - 100")
        }
        else {
            if (!params.userID) {
                axios({
                    method: "post",
                    url: "http://localhost:3000/users",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        age: age,
                        department: department,
                    }
                })
                return navigate("/")
            } else {
                axios({
                    method: "PUT",
                    url: `http://localhost:3000/users/${params.userID}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        age: age,
                        department: department
                    }
                })
                return navigate("/")
            }
        }

    }

    function onChangeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value)
        setError("")
    }
    function onChangeLastName(event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value)
        setError("")
    }
    function onChangeAddress(event: React.ChangeEvent<HTMLInputElement>) {
        setAddress(event.target.value)
        setError("")
    }
    function onChangeAge(event: React.ChangeEvent<HTMLInputElement>) {
        setAge(+event.target.value)
        setError("")
    }
    function onChangeDepartment(event: React.ChangeEvent<HTMLSelectElement>) {
        setDepartment(event.target.value)
        setError("")
    }

    useEffect(function () {
        if (params.userID) {
            fetchUserDetail()
        }
    }, [])

    useEffect(function () {
        if (userDetail) {
            setFirstName(userDetail.firstName)
            setLastName(userDetail.lastName)
            setAddress(userDetail.address)
            setAge(Number(userDetail.age))
            setDepartment(userDetail.department)
        }
    }, [userDetail])

    return (
        <div className="content">
            <h1 className="heading">{params.userID ? "Edit user" : "Create new user"}</h1>
            <div className="user-from">
                <form method="post" onSubmit={handleSubmit}>
                    <div className="user-wrapper">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="Your first name" onChange={onChangeFirstName} value={firstName} />
                    </div>
                    <div className="user-wrapper">
                        <label htmlFor="firstName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Your last name" onChange={onChangeLastName} value={lastName} />
                    </div>
                    <div className="user-wrapper">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" placeholder="Your addrest" onChange={onChangeAddress} value={address} />
                    </div>
                    <div className="user-wrapper">
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age" id="age" placeholder="Your age" onChange={onChangeAge} value={age} />
                        <p style={{
                        color: "red"
                    }}>{errorAge}</p>
                    </div>
                    
                    <div className="user-wrapper">
                        <label htmlFor="department">Department</label>
                        <select name="department" id="department" onChange={onChangeDepartment} value={department}>
                            <option value="fpt">FPT Software</option>
                            <option value="vti">VTI Group</option>
                            <option value="nashtech">Nashtech</option>
                            <option value="viettel">Viettel</option>
                        </select>
                    </div>
                    <p style={{
                        color: "red"
                    }}>{error}</p>
                    <p style={{
                        textAlign: "center",
                        margin: "40px 0 50px 0"
                    }}>
                        <button className='btn-form'>{params.userID ? "Edit user" : "Create new user"}</button>
                    </p>
                </form>
            </div>
        </div>
    )
}
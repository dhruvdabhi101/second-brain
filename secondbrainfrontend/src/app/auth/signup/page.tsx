'use client'
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { redirect } from "next/navigation"

export default function Home() {
    if (localStorage.getItem("token")) {
        redirect("/dashboard")
    }
    const [passError, setPassError] = useState(false)
    const [passErrorString, setPassErrorString] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [username, setUsername] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setPassError(true)
            setPassErrorString("Passwords do not match")
            return
        }
        if (password === confirmPassword) {
            setPassError(false)
        }
        if (username === "") {
            setPassError(true)
            setPassErrorString("Username cannot be empty")
            return
        }
        if (email === "") {
            setPassError(true)
            setPassErrorString("Email cannot be empty")
            return
        }
        if (password === "") {
            setPassError(true)
            setPassErrorString("Password cannot be empty")
            return
        }
        if (confirmPassword === "") {
            setPassError(true)
            setPassErrorString("Confirm Password cannot be empty")
            return
        }
        if (password.length < 8) {
            setPassError(true)
            setPassErrorString("Password must be atleast 8 characters long")
            return
        }

        try {
            const res = await axios.post("http://127.0.0.1:3000/signup", {
                username,
                email,
                password
            })
            if (res.status === 201) {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
            }else{
                setPassError(true)
                setPassErrorString(res.data.message)
            }
        } catch (error) {
            console.log(error)
            setPassError(true)
            setPassErrorString("Something went wrong")
        }
    }



    return (
        <>
            <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5">
                <div className="tabs ">
                    <Link href="/auth/login" className="tab tab-bordered tab-lg ">Login</Link>
                    <Link href="/auth/signup" className="tab tab-bordered tab-lg tab-active">Sign up</Link>
                </div>

                <div className="w-full p-6  md:max-w-md">
                    {passError ?
                        (<div className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{passErrorString}</span>
                        </div>) : (<></>)
                    }


                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Username</span>
                            </label>
                            <input type="text" placeholder="Enter Username" className="w-full input input-bordered" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Email Address" className="w-full input input-bordered" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Enter Password"
                                className="w-full input input-bordered" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Confirm Password"
                                className="w-full input input-bordered" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div>
                            <button className="btn btn-block bg-primary" onClick={handleSubmit}>SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


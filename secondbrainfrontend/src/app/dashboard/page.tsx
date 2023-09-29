"use client"
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


const LandingPage = () => {
    const { push } = useRouter()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            push("/dashboard/area")
        }
    }, [push])
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Second Brain</h1>
                        <p className="py-6">Manage your thoughts, resources on the go with Second Brain</p>
                        <Link href="/auth/login" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage;


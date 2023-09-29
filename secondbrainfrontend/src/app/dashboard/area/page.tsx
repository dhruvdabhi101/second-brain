"use client"
import AreaCard from "@/components/AreaCard"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Home = () => {
    const [search, setSearch] = useState("")
    const { push } = useRouter()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            push("/login");
        }
    }, [push])

    return (
        <>
            <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5 p-6">
                <div className="w-[70%]">
                    <button className="btn btn-primary self-start" onClick={() => document.getElementById("area-form").showModal()}> Create Area </button>
                </div>
                {/* area modal form */}
                <dialog id="area-form" className="modal">
                    <div className="modal-box">
                        <p className="text-lg font-bold">Create Area</p>
                        <div className="flex flex-col gap-4 my-3">
                            <input type="text" placeholder="Area Name" className="input input-bordered focus:input-primary" />
                            <textarea placeholder="Description" className="textarea textarea-bordered focus:textarea-primary h-32" />
                            <div className="flex flex-row justify-between">
                                <button className="btn btn-primary">Create</button>
                                <button className="btn btn-secondary" onClick={() => document.getElementById("area-form").close()}>Close</button>
                            </div>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button> close </button>
                    </form>
                </dialog>

                <AreaCard />
            </div>
        </>
    )
}
export default Home

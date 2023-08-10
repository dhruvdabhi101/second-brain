import Link from "next/link"
export default function Home() {
    return (
        <>
            <div className="flex flex-col self-center h-full w-full justify-center items-center gap-5">
                <div className="tabs ">
                    <Link href="/auth/login" className="tab tab-bordered tab-lg tab-active">Login</Link>
                    <Link href="/auth/signup" className="tab tab-bordered tab tab-lg">Sign up</Link>
                </div>

                <div className="w-full p-6  md:max-w-md">
                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Enter Password"
                                className="w-full input input-bordered" />
                        </div>
                        <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                        <div>
                            <button className="btn btn-block bg-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default function LoginPage(){
    return (
        <div className="bg-gray-300 h-screen flex justify-center items-center">
            <div className="bg-white h-[50%] w-[23%] space-y-3 rounded-xl shadow-2xl">
                <div className=" h-[25%] flex justify-center items-center mt-2">
                    <h1 className="bg-gray-200 h-[80%] w-[24%] flex items-center justify-center">LOGO</h1>
                </div>
                <div className="h-[20%] text-left px-4 pd-2">
                    <label>Email</label><br />
                    <input type="text" className="bg-gray-200 w-full rounded-md h-[50%] px-2" placeholder=" email" />
                </div>
                <div className="h-[20%] text-left px-4 pd-2">
                    <label>Password</label><br />
                    <input type="password" className="bg-gray-200 w-full rounded-md h-[50%] px-2" placeholder=" password" />
                </div>
                <div className="h-[15%] flex justify-center pt-3">
                <button className="h-full w-[88%] flex justify-center items-center bg-green-600 rounded-md hover:rounded-3xl active:bg-green-700 focus:ring">Login</button>
                </div>
            </div>
        </div>
    )
}
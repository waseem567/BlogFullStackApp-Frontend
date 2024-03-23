import Link from "next/link";

const NotFound = () => {
    return <div className="gap-3 h-screen flex flex-col justify-center items-center">
        <p className="text-9xl font-black text-white drop-shadow-md">404</p>
        <p className="text-center text-gray-600">Page Not Found!</p>
        <Link href={"/"}><button className="py-2 px-5 border bg-indigo-700 text-white">Go Back To Main Page</button></Link>
    </div>
};
export default NotFound;
export default function Header() {
    return (
        <div className=" h-[15%] flex justify-between items-center px-6">
            <input
                type="text"
                className="h-8 rounded-3xl px-5 shadow-lg"
                placeholder="Search..."
            />
            <img
                src="https://sps.widyatama.ac.id/wp-content/uploads/2020/08/dummy-profile-pic-male1.jpg"
                className="bg-gray-200 h-16 w-16 rounded-full flex items-center justify-center shadow-lg"
            />
        </div>
    );
}

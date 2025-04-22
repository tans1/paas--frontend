const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm font-sans sticky top-0 z-10">
      <div className="py-3 px-10 flex justify-end items-center gap-3">
        <div>
          <i className="fa-solid fa-bell text-xl"></i>
        </div>
        <div>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
              alt="user-image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

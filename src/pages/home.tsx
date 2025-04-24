function Home() {
  return (
    <div className="bg-gradient-to-tr from-indigo-100 to-white">
      <div className="max-w-screen-lg mx-auto">
        {/* Inroduction text with action verbs */}
        <div className="grid lg:grid-cols-2 mx-auto p-20">
          <div className="grid-cols-subgrid">
            <p className="text-5xl font-bold size-fit">
              Fast & Secure
              <br /> Platform-as-a-Service
              <br />
              Web Hosting Simplified
            </p>
            <p className="text-2xl font-light">
              We provide quick and high-qualilty hosting services for your
              website
            </p>
          </div>
          <div className="grid-cols-subgrid text-6xl size-fit pt-10 text-blue-600">
            <p>
              <span className="text-sm font-bold">Starting from</span>1000
              <span className="text-sm font-bold">birr</span>
            </p>
          </div>
        </div>
        {/* button for a call to action */}
        <a
          href="/login"
          className="mb-14 mx-auto block p-5 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-full bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center">
          Get Started Now!
        </a>
        {/* boxes with core features of the site */}
        <div className="justify-center grid sm:grid-cols-3 size-max my-5 mx-auto gap-4">
          <div className="rounded-3xl shadow hover:shadow-sky-600 justify-items-center w-52 h-52">
            <img
              className="w-14 h-14 mx-auto"
              src="../../../logo192.png"
              alt="Support"
            />
            <p className="font-bold font text-center text-lg">
              Supporting you all the way
            </p>
            <p className="font-light text-center">
              support via email and calls
            </p>
            <p className="font-bold text-center text-sm">Get support</p>
          </div>
          <div className="rounded-3xl shadow hover:shadow-sky-600 justify-items-center w-52 h-52">
            <img
              className="w-14 h-14 mx-auto"
              src="../../../logo192.png"
              alt="Setup"
            />
            <p className="font-bold font text-center text-lg">Instant Setup</p>
            <p className="font-light text-center">
              Automatic setup via GitHub intergration
            </p>
            <p className="font-bold text-center text-sm">Get support</p>
          </div>
          <div className="rounded-3xl shadow hover:shadow-sky-600 justify-items-center w-52 h-52">
            <img
              className="w-14 h-14 mx-auto"
              src="../../../logo192.png"
              alt="Upgrade"
            />
            <p className="font-bold font text-center text-lg">
              Easy to Upgrade
            </p>
            <p className="font-light text-center">
              You can easily upgrage your plan anytime
            </p>
            <p className="font-bold text-center text-sm">Get support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

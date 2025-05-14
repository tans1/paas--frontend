import CircularIcons from '../atoms/circularIcons'
import ScrollFade from '../ui/scroll-fade'
const Intro = () => {
  return (
    <ScrollFade>
      <div>
        <div className="max-w-screen mx-auto">
          {/* Inroduction text with action verbs */}
          <section id="home" className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white pt-32 pb-20 md:pt-40 md:pb-32 fade-section">
            <div className="bg-transparent fill-white absolute bottom-0 left-0 w-full overflow-hidden leading-none -rotate-180">
              <svg viewBox="0 0 1200 120">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
              </svg>
            </div>
            <div className="max-w-7xl mx-auto mb-10 px-4 sm:px-6 lg:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Fast & Secure<br /> Platform-as-a-Service
                    <br />Web Hosting Simplified</h1>
                  <p className="text-xl md:text-2xl text-indigo-100 mb-8">We provide quick and high-qualilty hosting services
                    for your website.</p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="/register">
                      <button className="bg-gradient-to-tr from-red-500 to-orange-400 text-white hover:bg-gradient-to-tr hover:from-red-600 hover:to-orange-500 hover:shadow-lg px-8 py-3 rounded-lg font-semibold btn-glow">
                        Get Started
                      </button>
                    </a>
                    <a href="/login">
                      <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                        Login
                      </button>
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-md">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-10 w-32 h-32 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="relative">
                      <CircularIcons />
                      {/* <img src="https://illustrations.popsy.co/amber/digital-nomad.svg" alt="Hero Illustration" className="w-full h-auto" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* boxes with core features of the site */}
          <ScrollFade>
            <div className="justify-center grid sm:grid-cols-3 size-max my-50 mx-auto gap-10">
              <div className="rounded-3xl shadow hover:shadow-sky-600 justify-items-center text-center pt-3 w-52 h-52">
                <i className="fas fa-gears text-indigo-600 text-7xl" />
                <p className="font-bold font text-center text-lg">Instant Setup</p>
                <p className="font-light text-center">
                  Automatic setup via GitHub intergration
                </p>
                <p className="font-bold text-center text-sm">Get support</p>
              </div>
              <div className="rounded-3xl shadow hover:shadow-sky-600 justify-items-center text-center pt-3 w-52 h-52">
                <i className="fas fa-arrow-up-right-dots text-indigo-600 text-7xl" />
                <p className="font-bold font text-center text-lg">
                  Easy to Upgrade
                </p>
                <p className="font-light text-center">
                  You can easily upgrage your plan anytime
                </p>
                <p className="font-bold text-center text-sm">Get support</p>
              </div>
              <div className="rounded-3xl shadow hover:shadow-sky-600 justify-items-center text-center pt-3 w-52 h-52 ">
                <i className="fas fa-headset text-indigo-600 text-7xl" />
                <p className="font-bold font text-center text-lg">
                  Supporting you all the way
                </p>
                <p className="font-light text-center">
                  Support via email and calls
                </p>
                <p className="font-bold text-center text-sm">Get support</p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </div>
    </ScrollFade>
  )
}

export default Intro
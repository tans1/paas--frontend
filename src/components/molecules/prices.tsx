import { Check } from "lucide-react";
import ScrollFade from "../ui/scroll-fade";

const Prices = () => {
  return (
    <ScrollFade>
      <section
        id="pricing"
        className="my- 10 py-20 bg-gradient-to-br from-gray-50 to-blue-50 fade-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pay only for what you use. No hidden fees, no commitments, scale
              as you grow.
            </p>
          </div>

          {/* Main Pricing Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
                <h3 className="text-3xl font-bold mb-2">Pay As You Go</h3>
                <p className="text-indigo-100 text-lg">
                  Unlimited resources, transparent pricing
                </p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center group">
                    <div className="bg-blue-50 rounded-xl p-6 group-hover:bg-blue-100 transition-colors duration-300">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        0.02
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        Birr per CPU second
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Pay only for active CPU time
                      </div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="bg-green-50 rounded-xl p-6 group-hover:bg-green-100 transition-colors duration-300">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        0.00003
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        Birr per MB memory second
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Pay only for memory usage
                      </div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="bg-purple-50 rounded-xl p-6 group-hover:bg-purple-100 transition-colors duration-300">
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        0.002
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        Birr per MB network second
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Pay only for data transfer
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <a href="/register">
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Start Building Now
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  No Hidden Fees
                </h4>
                <p className="text-gray-600 text-sm">
                  Transparent pricing with no surprises
                </p>
              </div>
            </div>
            {/* <div className="text-center group">
              <div className="bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Scale Instantly
                </h4>
                <p className="text-gray-600 text-sm">
                  Grow or shrink resources on demand
                </p>
              </div>
            </div> */}
            <div className="text-center group">
              <div className="bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  No Commitments
                </h4>
                <p className="text-gray-600 text-sm">
                  Start and stop anytime you want
                </p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Unlimited Resources
                </h4>
                <p className="text-gray-600 text-sm">Use as much as you need</p>
              </div>
            </div>
          </div>

          {/* Cost Calculator */}
          <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Cost Examples
            </h3>
            <p className="text-gray-600 text-center mb-12">
              See how much you could save with our usage-based pricing
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-bold text-gray-800 mb-3">
                    Small Application
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• 1 CPU core running 24/7</div>
                    <div>• 2GB RAM usage</div>
                    <div>• 1GB network traffic/day</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mt-4">
                    ~1,440 birr/month
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-bold text-gray-800 mb-3">
                    Medium Application
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• 4 CPU cores running 24/7</div>
                    <div>• 8GB RAM usage</div>
                    <div>• 5GB network traffic/day</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mt-4">
                    ~5,760 birr/month
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-bold text-gray-800 mb-3">
                    Large Application
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• 8 CPU cores running 24/7</div>
                    <div>• 16GB RAM usage</div>
                    <div>• 10GB network traffic/day</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mt-4">
                    ~11,520 birr/month
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-3">
                    Development/Testing
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• 2 CPU cores, 8 hours/day</div>
                    <div>• 4GB RAM usage</div>
                    <div>• 500MB network traffic/day</div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mt-4">
                    ~480 birr/month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollFade>
  );
};

export default Prices;

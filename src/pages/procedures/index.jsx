import React from 'react';
import { Link } from 'react-router-dom';
import { Button, DotLottiePlayer, Container } from '../../components/ui';
import { HeaderProcedure, Footer } from '../../components';

const ProceduresPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7fdf9]">
      <HeaderProcedure title="Procedures" />
      <main className="flex-grow py-12">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[#157a3c] mb-8 text-center">Available Procedures</h1>
            <div className="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-[#157a3c] mb-6">Select one of the following procedures</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* License Procedures */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <DotLottiePlayer
                      src="/json/chicolentes.json"
                      autoplay={true}
                      loop={true}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">License Services</h3>
                  <div className="space-y-4">
                    <div>
                      <Link to="/procedures/license-renewal">
                        <Button variant="secondary" className="w-full justify-between">
                          <span>License Renewal</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/procedures/duplicate-license">
                        <Button variant="secondary" className="w-full justify-between">
                          <span>Duplicate License</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/procedures/reciprocity-license">
                        <Button variant="secondary" className="w-full justify-between">
                          <span>Reciprocity License</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Vehicle Procedures */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <DotLottiePlayer
                      src="/json/carrito.json"
                      autoplay={true}
                      loop={true}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Services</h3>
                  <div className="space-y-4">
                    <div>
                      <Link to="/procedures/vehicle-transfer">
                        <Button variant="secondary" className="w-full justify-between">
                          <span>Vehicle Transfer</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/procedures/title-management">
                        <Button variant="secondary" className="w-full justify-between">
                          <span>Title Management</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/procedures/tablillas-incapacidad">
                        <Button variant="secondary" className="w-full justify-between">
                          <span>Tablillas Incapacidad</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/procedures/liens">
                        <Button variant="secondary" className="w-full justify-between">
                          <span>Liens</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                    <div>
                      <Link to="/procedures/drivers-record">
                        <Button variant="secondary" className="w-full justify-between">
                          <span>Driver's Record</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ProceduresPage; 
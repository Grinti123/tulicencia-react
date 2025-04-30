import React from 'react';
import { Button, Container, DotLottiePlayer } from '../components/ui';
import HeaderRegister from '../components/HeaderRegister';

const TwoStepAuthentication = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <HeaderRegister />
      <Container>
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <div className="w-full h-96">
            <DotLottiePlayer
              src="/json/chicolaptop2.json"
              autoplay
              loop
            />
          </div>

          <div className="text-left">
            <h1 className="text-2xl font-bold text-[#1a602d] mb-4">
              At Cesco Online we protect your security
            </h1>
            <p className="text-gray-600 mb-8">
              We've created two levels of authentication to protect your account and allow you to regain access if you forget your password.
            </p>

            <div className="space-y-4">
              <Button
                variant="primary"
                fullWidth
                onClick={() => {}}
              >
                Activate Two-Factor Authentication
              </Button>

              <Button
                variant="secondary"
                fullWidth
                onClick={() => {}}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TwoStepAuthentication;
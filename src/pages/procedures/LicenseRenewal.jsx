import React, { useState, useEffect } from 'react';
import { Button, DotLottiePlayer, InputForm, RadioGroup } from '../../components/ui';
import { HeaderProcedure, Footer } from '../../components';
import { Link, useNavigate } from 'react-router-dom';

const LicenseRenewalPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    // License type
    licenseType: 'driver',
    licenseNumber: '',
    licenseCategory: 'driver',
    
    // Personal identification
    idType: 'social',
    idNumber: '',
    
    // Legal status
    legalStatus: 'permanent',
    
    // Personal info
    gender: 'male',
    organDonor: false,
    bloodType: '',
    
    // Physical characteristics
    height: { feet: '5', inches: '6' },
    weight: '',
    complexion: '',
    hairColor: '',
    eyeColor: '',
    
    // Address
    residentialAddress: {
      urbanization: '',
      streetNumber: '',
      town: '',
      zipCode: ''
    },
    mailingAddressSameAsResidential: true,
    
    // Legal questions
    licenseSuspended: false,
    suspensionReason: '',
    institutionalized: false,
    convictedDUI: false,
    convictionDateDUI: '',
    convictedNarcotics: false,
    convictionDateNarcotics: '',
    supportObligation: false,
    medicalDebt: false
  });

  // Load user data from localStorage when component mounts
  useEffect(() => {
    console.log('🔄 License Renewal form loading user data from localStorage...');
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        
        // Get user item data
        const userItem = parsedUser.item || {};
        console.log('📋 User data loaded:', userItem);
        
        // Pre-fill form data with user information
        setFormData(prevData => ({
          ...prevData,
          // License information
          licenseNumber: userItem.cl_numeroLicencia || '',
          
          // Personal identification
          idNumber: userItem.cl_numeroSeguro || '', // SSN
          
          // Address
          residentialAddress: {
            ...prevData.residentialAddress,
            zipCode: userItem.cl_zip || '',
            streetNumber: userItem.cl_direccion || '',
            town: userItem.cl_puebloA ? userItem.cl_puebloA.toString() : ''
          }
        }));
        
        console.log('✅ Form pre-filled with user data');
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
      }
    } else {
      console.log('⚠️ No user data found in localStorage');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      // Handle nested objects (like address fields)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Submit the form data to the server
    // Then navigate to the next step or confirmation page
    setStep(11); // Go to thank you page
  };
  
  // Main form container
  const renderStepContainer = (title, leftContent, rightContent) => (
    <div className="min-h-screen flex flex-col bg-[#f7fdf9]">
      <HeaderProcedure title="License Renewal" />
      <main className="flex-grow py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center">
                {leftContent}
              </div>
              <div>
                {rightContent}
              </div>
            </div>
            
            <div className="flex flex-col-reverse md:flex-row md:justify-between mt-6 gap-4">
              {step > 1 && step !== 11 ? (
                <Button 
                  onClick={prevStep}
                  variant="secondary"
                >
                  Go back
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 10 ? (
                <Button 
                  onClick={nextStep}
                  variant="primary"
                >
                  Next
                </Button>
              ) : step === 10 ? (
                <Button 
                  onClick={handleSubmit}
                  variant="primary"
                >
                  Finish
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // Get user's name from userData
  const getUserName = () => {
    if (!userData) return 'there';
    
    const userItem = userData.item || {};
    const firstName = userItem.cl_nombre || '';
    
    return firstName || 'there';
  };

  // Render appropriate step content
  const renderFormStep = () => {
    switch(step) {
      case 1:
        return renderLicenseTypeStep();
      case 2:
        return renderIDTypeStep();
      case 3:
        return renderLegalStatusStep();
      case 4:
        return renderGenderStep();
      case 5:
        return renderPhysicalCharacteristicsStep();
      case 6:
        return renderAddressStep();
      case 7:
        return renderMailingAddressStep();
      case 8:
        return renderLegalQuestionsStep1();
      case 9:
        return renderLegalQuestionsStep2();
      case 10:
        return renderFinalQuestionsStep();
      case 11:
        return renderThankYouStep();
      default:
        return renderLicenseTypeStep();
    }
  };

  // Step 1: License Type Selection
  const renderLicenseTypeStep = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-4xl font-bold mt-6 text-[#157a3c] text-center">¡Hello {getUserName()}!</h2>
        <p className="text-lg text-center mt-2">
          Let's start by registering your account
        </p>
      </>
    );

    const licenseTypeOptions = [
      { value: 'driver', label: 'Driver license' },
      { value: 'realid', label: 'Real ID Driver\'s License' }
    ];

    const licenseCategoryOptions = [
      { value: 'driver', label: 'Driver' },
      { value: 'chofer', label: 'Chofer' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">What Type of License Do You Need?</h3>
          
          <RadioGroup
            options={licenseTypeOptions}
            name="licenseType"
            value={formData.licenseType}
            onChange={(value) => handleRadioChange('licenseType', value)}
          />
        </div>
        
        <InputForm
          id="licenseNumber"
          name="licenseNumber"
          label="License number"
          value={formData.licenseNumber}
          onChange={handleChange}
          placeholder="3281192"
          required={true}
        />
        
        <div>
          <h3 className="text-lg font-medium mb-4">What category does it belong to?</h3>
          
          <RadioGroup
            options={licenseCategoryOptions}
            name="licenseCategory"
            value={formData.licenseCategory}
            onChange={(value) => handleRadioChange('licenseCategory', value)}
          />
        </div>
      </div>
    );

    return renderStepContainer("License Information", leftContent, rightContent);
  };

  // Step 2: ID Type Selection and Personal Information
  const renderIDTypeStep = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-2xl font-semibold mt-6 text-center">Personal Identification</h2>
        <p className="text-center mt-2">
          Please provide your identification information
        </p>
      </>
    );

    const idTypeOptions = [
      { value: 'social', label: 'Social Security Number' },
      { value: 'passport', label: 'Passport Number' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">What type of ID would you like to use?</h3>
          <RadioGroup
            options={idTypeOptions}
            name="idType"
            value={formData.idType}
            onChange={(value) => handleRadioChange('idType', value)}
          />
        </div>
        
        <InputForm
          id="idNumber"
          name="idNumber"
          label={formData.idType === 'social' ? 'Social Security Number' : 'Passport Number'}
          type="text"
          value={formData.idNumber}
          onChange={handleChange}
          placeholder={formData.idType === 'social' ? '123-45-6789' : 'AB1234567'}
          required={true}
        />
      </div>
    );

    return renderStepContainer("Personal Identification", leftContent, rightContent);
  };

  // Step 3: Legal Status
  const renderLegalStatusStep = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-4xl font-bold mt-6 text-[#157a3c] text-center">We continue</h2>
      </>
    );

    const legalStatusOptions = [
      { value: 'permanent', label: 'Permanent Resident' },
      { value: 'citizen', label: 'US Citizen' },
      { value: 'temporary', label: 'Temporary Resident' },
      { value: 'other', label: 'Other' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <InputForm
          id="legalStatus"
          name="legalStatus"
          label="Indicate the status of your legal presence in Puerto Rico"
          type="select"
          value={formData.legalStatus}
          onChange={handleChange}
          options={legalStatusOptions}
          required={true}
        />
        <p className="text-sm text-gray-500 -mt-4">(Required by CESCO)</p>
      </div>
    );

    return renderStepContainer("Legal Status", leftContent, rightContent);
  };

  // Step 4: Gender and Health Information
  const renderGenderStep = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-4xl font-bold mt-6 text-[#157a3c] text-center">We continue</h2>
      </>
    );

    const genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ];

    const organDonorOptions = [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' }
    ];

    const bloodTypeOptions = [
      { value: '', label: 'Select blood type' },
      { value: 'A+', label: 'A+' },
      { value: 'A-', label: 'A-' },
      { value: 'B+', label: 'B+' },
      { value: 'B-', label: 'B-' },
      { value: 'AB+', label: 'AB+' },
      { value: 'AB-', label: 'AB-' },
      { value: 'O+', label: 'O+' },
      { value: 'O-', label: 'O-' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Gender</h3>
          
          <RadioGroup
            options={genderOptions}
            name="gender"
            value={formData.gender}
            onChange={(value) => handleRadioChange('gender', value)}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Do I want to be an Organ Donor?</h3>
          
          <RadioGroup
            options={organDonorOptions}
            name="organDonor"
            value={formData.organDonor.toString()}
            onChange={(value) => handleRadioChange('organDonor', value === 'true')}
          />
        </div>
        
        <InputForm
          id="bloodType"
          name="bloodType"
          label="Blood type"
          type="select"
          value={formData.bloodType}
          onChange={handleChange}
          options={bloodTypeOptions}
        />
      </div>
    );

    return renderStepContainer("Personal Information", leftContent, rightContent);
  };

  // Step 5: Physical Characteristics
  const renderPhysicalCharacteristicsStep = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-4xl font-bold mt-6 text-[#157a3c] text-center">Describe yourself</h2>
      </>
    );

    const feetOptions = [4, 5, 6, 7].map(num => ({ value: num.toString(), label: num.toString() }));
    const inchesOptions = Array.from({length: 12}, (_, i) => ({ value: i.toString(), label: i.toString() }));
    
    const complexionOptions = [
      { value: '', label: 'Select' },
      { value: 'White', label: 'White' },
      { value: 'Black', label: 'Black' },
      { value: 'Hispanic', label: 'Hispanic' },
      { value: 'Asian', label: 'Asian' },
      { value: 'Other', label: 'Other' }
    ];
    
    const hairColorOptions = [
      { value: '', label: 'Select' },
      { value: 'Black', label: 'Black' },
      { value: 'Brown', label: 'Brown' },
      { value: 'Blonde', label: 'Blonde' },
      { value: 'Red', label: 'Red' },
      { value: 'Gray', label: 'Gray' },
      { value: 'White', label: 'White' }
    ];
    
    const eyeColorOptions = [
      { value: '', label: 'Select' },
      { value: 'Brown', label: 'Brown' },
      { value: 'Blue', label: 'Blue' },
      { value: 'Green', label: 'Green' },
      { value: 'Hazel', label: 'Hazel' },
      { value: 'Gray', label: 'Gray' },
      { value: 'Black', label: 'Black' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <InputForm
              id="heightFeet"
              name="height.feet"
              label="Stature (Feet)"
              type="select"
              value={formData.height.feet}
              onChange={handleChange}
              options={feetOptions}
            />
          </div>
          
          <div className="flex-1">
            <InputForm
              id="heightInches"
              name="height.inches"
              label="Estura (Inches)"
              type="select"
              value={formData.height.inches}
              onChange={handleChange}
              options={inchesOptions}
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <InputForm
              id="weight"
              name="weight"
              label="Weight (Libras)"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              placeholder="457"
            />
          </div>
          
          <div className="flex-1">
            <InputForm
              id="complexion"
              name="complexion"
              label="Complexion"
              type="select"
              value={formData.complexion}
              onChange={handleChange}
              options={complexionOptions}
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <InputForm
              id="hairColor"
              name="hairColor"
              label="Hair color"
              type="select"
              value={formData.hairColor}
              onChange={handleChange}
              options={hairColorOptions}
            />
          </div>
          
          <div className="flex-1">
            <InputForm
              id="eyeColor"
              name="eyeColor"
              label="Eye color"
              type="select"
              value={formData.eyeColor}
              onChange={handleChange}
              options={eyeColorOptions}
            />
          </div>
        </div>
      </div>
    );

    return renderStepContainer("Physical Characteristics", leftContent, rightContent);
  };

  // Step 6: Address Information
  const renderAddressStep = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64">
          <DotLottiePlayer
            src="/json/direccion.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-2xl font-semibold mt-6 text-center">Your Residential Address</h2>
        <p className="text-center mt-2">
          Please provide your current residential address
        </p>
      </>
    );

    const rightContent = (
      <div className="space-y-6">
        <InputForm
          id="residentialAddress.urbanization"
          name="residentialAddress.urbanization"
          label="Urbanization/Development"
          value={formData.residentialAddress.urbanization}
          onChange={handleChange}
          placeholder="e.g. Villa Andalucía"
        />
        
        <InputForm
          id="residentialAddress.streetNumber"
          name="residentialAddress.streetNumber"
          label="Street Number and Name"
          value={formData.residentialAddress.streetNumber}
          onChange={handleChange}
          placeholder="e.g. 123 Main St"
          required={true}
        />
        
        <InputForm
          id="residentialAddress.town"
          name="residentialAddress.town"
          label="Town/City"
          value={formData.residentialAddress.town}
          onChange={handleChange}
          placeholder="e.g. San Juan"
          required={true}
        />
        
        <InputForm
          id="residentialAddress.zipCode"
          name="residentialAddress.zipCode"
          label="Zip Code"
          value={formData.residentialAddress.zipCode}
          onChange={handleChange}
          placeholder="e.g. 00926"
          required={true}
        />
      </div>
    );

    return renderStepContainer("Residential Address", leftContent, rightContent);
  };

  // Step 7: Mailing Address
  const renderMailingAddressStep = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-4xl font-bold mt-6 text-[#157a3c] text-center">Conteste carefully</h2>
        <p className="text-lg text-center mt-2">the following.</p>
      </>
    );

    const mailingAddressOptions = [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            Is your mailing address the same as your residential address?
          </h3>
          
          <RadioGroup
            options={mailingAddressOptions}
            name="mailingAddressSameAs"
            value={formData.mailingAddressSameAsResidential.toString()}
            onChange={(value) => handleRadioChange('mailingAddressSameAsResidential', value === 'true')}
          />
        </div>
        
        <div>
          <p className="text-md text-gray-700">
            We will continue with the data of your previously registered 
            <span className="font-semibold"> residencial address</span> 😊
          </p>
        </div>
      </div>
    );

    return renderStepContainer("Mailing Address", leftContent, rightContent);
  };

  // Step 8: Legal Questions Part 1
  const renderLegalQuestionsStep1 = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-4xl font-bold mt-6 text-[#157a3c] text-center">Conteste carefully</h2>
        <p className="text-lg text-center mt-2">the following</p>
      </>
    );

    const yesNoOptions = [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' }
    ];

    const suspensionReasonOptions = [
      { value: '', label: 'Select reason' },
      { value: 'Point system', label: 'Point system' },
      { value: 'DUI', label: 'DUI' },
      { value: 'Unpaid tickets', label: 'Unpaid tickets' },
      { value: 'Other', label: 'Other' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            Has your license been suspended in Puerto Rico?
          </h3>
          
          <RadioGroup
            options={yesNoOptions}
            name="licenseSuspended"
            value={formData.licenseSuspended.toString()}
            onChange={(value) => handleRadioChange('licenseSuspended', value === 'true')}
          />
        </div>
        
        {formData.licenseSuspended && (
          <InputForm
            id="suspensionReason"
            name="suspensionReason"
            label="Motivo"
            type="select"
            value={formData.suspensionReason}
            onChange={handleChange}
            options={suspensionReasonOptions}
          />
        )}
      
        <div>
          <h3 className="text-lg font-medium mb-4">
            Have you been institutionalized for mental disorders?
          </h3>
          
          <RadioGroup
            options={yesNoOptions}
            name="institutionalized"
            value={formData.institutionalized.toString()}
            onChange={(value) => handleRadioChange('institutionalized', value === 'true')}
          />
        </div>
      </div>
    );

    return renderStepContainer("Legal Questions", leftContent, rightContent);
  };

  // Step 9: Legal Questions Part 2
  const renderLegalQuestionsStep2 = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-4xl font-bold mt-6 text-[#157a3c] text-center">Noted!</h2>
        <p className="text-lg text-center mt-2">
          Just 2 ask more.
        </p>
      </>
    );

    const yesNoOptions = [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            Have you been convicted of using intoxicating beverages?
          </h3>
          
          <RadioGroup
            options={yesNoOptions}
            name="convictedDUI"
            value={formData.convictedDUI.toString()}
            onChange={(value) => handleRadioChange('convictedDUI', value === 'true')}
          />
        </div>
        
        {formData.convictedDUI && (
          <InputForm
            id="convictionDateDUI"
            name="convictionDateDUI"
            label="Fecha"
            type="date"
            value={formData.convictionDateDUI}
            onChange={handleChange}
          />
        )}
      </div>
    );

    return renderStepContainer("Legal Questions", leftContent, rightContent);
  };

  // Step 10: Final Questions
  const renderFinalQuestionsStep = () => {
    const leftContent = (
      <>
        <div className="w-64 h-64 mb-4">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <h2 className="text-4xl font-bold mt-6 text-[#157a3c] text-center">Noted!</h2>
        <p className="text-lg text-center mt-2">
          Just 1 ask more.
        </p>
      </>
    );

    const yesNoOptions = [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' }
    ];

    const rightContent = (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            Have you been convicted under the Narcotics Act?
          </h3>
          
          <RadioGroup
            options={yesNoOptions}
            name="convictedNarcotics"
            value={formData.convictedNarcotics.toString()}
            onChange={(value) => handleRadioChange('convictedNarcotics', value === 'true')}
          />
        </div>
        
        {formData.convictedNarcotics && (
          <InputForm
            id="convictionDateNarcotics"
            name="convictionDateNarcotics"
            label="Fecha"
            type="date"
            value={formData.convictionDateNarcotics}
            onChange={handleChange}
          />
        )}
      </div>
    );

    return renderStepContainer("Legal Questions", leftContent, rightContent);
  };

  // Step 11: Thank You
  const renderThankYouStep = () => {
    return (
      <div className="min-h-screen flex flex-col bg-[#e8f8ee]">
        <HeaderProcedure title="License Renewal" />
        <main className="flex-grow py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-64 h-64 mb-4">
                <DotLottiePlayer
                  src="/json/chicolentes.json"
                  autoplay={true}
                  loop={true}
                />
              </div>
              
              <h2 className="text-4xl font-bold mb-4 text-[#157a3c]">Thank you!</h2>
              
              <p className="text-xl text-gray-700 text-center max-w-2xl mb-6">
                Your information has been received and your request has been registered. 
                You will receive a confirmation email.
              </p>
              
              <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
                The next step is to upload your documents and photos. It's quick and easy!
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <Button 
                  onClick={() => navigate('/procedures/license-renewal/upload')}
                  variant="primary"
                  className="w-full md:w-auto px-8"
                >
                  Let's start
                </Button>
                
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-[#157a3c] underline"
                >
                  I'm tired, I'd rather do it later
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Render the current step
  return renderFormStep();
};

export default LicenseRenewalPage; 
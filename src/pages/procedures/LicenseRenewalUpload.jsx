import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, DotLottiePlayer } from '../../components/ui';
import { HeaderProcedure, Footer } from '../../components';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Import jsPDF library

// Color constants for consistency
const COLORS = {
  primary: '#147A31',
  secondary: '#6949FF',
  lightBg: '#e8f8ee',
  pageBg: '#f7fdf9',
};

const LicenseRenewalUpload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selfie: null,
    signature: null,
    documents: {
      socialSecurity: null,
      birthCertificate: null,
      proofOfAddress: null,
      medicalCertification: null,
      licensePhotos: null
    }
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // PDF Preview state
  const [showPreview, setShowPreview] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  
  // Camera related states
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Signature related states
  const signatureCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureContext, setSignatureContext] = useState(null);
  
  // Start camera when entering the selfie step
  useEffect(() => {
    if (step === 2) {
      startCamera();
    } else {
      stopCamera();
    }
    
    // Cleanup on component unmount
    return () => {
      stopCamera();
    };
  }, [step]);

  // Initialize signature canvas when reaching the signature step
  useEffect(() => {
    if (step === 3 && signatureCanvasRef.current) {
      const canvas = signatureCanvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions and style
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Setup drawing context
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.strokeStyle = '#000000';
      setSignatureContext(context);
      
      console.log('✏️ Signature canvas initialized');
    }
  }, [step]);

  // Cleanup PDF URL on component unmount
  useEffect(() => {
    return () => {
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
    };
  }, []);

  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (step === 3 && signatureCanvasRef.current && signatureContext) {
        const canvas = signatureCanvasRef.current;
        const currentDrawing = canvas.toDataURL();
        
        // Create an image to store the current drawing
        const img = new Image();
        img.onload = () => {
          // Resize canvas
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          // Reset context properties after resize
          signatureContext.lineWidth = 2;
          signatureContext.lineCap = 'round';
          signatureContext.strokeStyle = '#000000';
          
          // Draw the previous content back
          signatureContext.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = currentDrawing;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [step, signatureContext]);

  // Initialize and start the camera
  const startCamera = async () => {
    try {
      console.log('🎥 Starting camera...');
      setCameraError(null);
      
      // Request camera access with preferred settings
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user', // Front camera for selfies
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false 
      });
      
      // Save stream reference to stop it later
      streamRef.current = stream;
      
      // Connect stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        console.log('✅ Camera started successfully');
      }
    } catch (error) {
      console.error('❌ Camera error:', error);
      setCameraError(`Camera error: ${error.message || 'Could not access camera'}`);
      setIsCameraActive(false);
    }
  };

  // Stop the camera and release resources
  const stopCamera = () => {
    if (streamRef.current) {
      console.log('🛑 Stopping camera stream');
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
    }
  };

  // Take a photo using the canvas
  const takePhoto = () => {
    if (!isCameraActive || !videoRef.current || !canvasRef.current) {
      console.log('⚠️ Cannot take photo: camera inactive or refs not ready');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to file
    canvas.toBlob((blob) => {
      if (blob) {
        // Create a File object from the blob
        const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
        handleFileChange('selfie', file);
        console.log('📸 Photo taken and saved');
      }
    }, 'image/jpeg', 0.9);
  };

  // Signature drawing handlers
  const startDrawing = (e) => {
    if (!signatureContext) return;
    
    // Get mouse position relative to canvas
    const { offsetX, offsetY } = getEventCoordinates(e);
    
    // Start a new path
    signatureContext.beginPath();
    signatureContext.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing || !signatureContext) return;
    
    // Get mouse position
    const { offsetX, offsetY } = getEventCoordinates(e);
    
    // Draw line to current position
    signatureContext.lineTo(offsetX, offsetY);
    signatureContext.stroke();
  };

  const stopDrawing = () => {
    if (!signatureContext) return;
    
    signatureContext.closePath();
    setIsDrawing(false);
    
    // Save signature image if drawing happened
    if (hasSignature && signatureCanvasRef.current) {
      saveSignatureImage();
    }
  };

  // Handle touch events coordinates
  const getEventCoordinates = (e) => {
    if (!signatureCanvasRef.current) return { offsetX: 0, offsetY: 0 };
    
    const canvas = signatureCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Handle both mouse and touch events
    if (e.touches && e.touches[0]) {
      return { 
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    }
    
    return {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };
  };

  // Save signature as image file
  const saveSignatureImage = () => {
    if (!signatureCanvasRef.current) return;
    
    try {
      const canvas = signatureCanvasRef.current;
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "signature.jpg", { type: "image/jpeg" });
          handleFileChange('signature', file);
          console.log('✏️ Signature saved');
        }
      });
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  // Clear signature canvas
  const clearSignature = () => {
    if (!signatureCanvasRef.current || !signatureContext) return;
    
    signatureContext.clearRect(
      0, 0, 
      signatureCanvasRef.current.width, 
      signatureCanvasRef.current.height
    );
    setHasSignature(false);
    handleFileChange('signature', null);
    console.log('🧹 Signature cleared');
  };

  const handleFileChange = (field, file) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: file
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Show document preview with signature
  const showDocumentPreview = async () => {
    if (!formData.signature) {
      console.log('⚠️ No signature available for preview');
      return;
    }
    
    try {
      console.log('📄 Generating PDF document preview...');
      
      // Get user data if available
      let userName = 'Juan Pablo Domínguez';
      let userAddress = 'Calle Principal #123, San Juan, PR 00901';
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (userData && userData.item) {
        const userItem = userData.item;
        const firstName = userItem.cl_nombre || '';
        const lastName = userItem.cl_primerApellido || '';
        const secondLastName = userItem.cl_segundoApellido || '';
        
        if (firstName || lastName || secondLastName) {
          userName = `${firstName} ${lastName} ${secondLastName}`.trim();
        }
        
        // Get address if available
        if (userItem.cl_direccion) {
          userAddress = userItem.cl_direccion;
        }
      }
      
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Set font
      doc.setFont('helvetica');
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(COLORS.secondary.replace('#', '')); // Remove # for jsPDF color
      doc.text('Carta de Autorización', 105, 40, { align: 'center' });
      
      // Add logo
      try {
        // Create an image element for the logo
        const logoImg = new Image();
        logoImg.src = '/img/Mesa2.png';
        logoImg.crossOrigin = "Anonymous"; // Try to avoid CORS issues
        
        // Wait for logo to load
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = reject;
          // Timeout as fallback
          setTimeout(resolve, 2000);
        });
        
        // Create canvas with proper dimensions to maintain aspect ratio
        const canvas = document.createElement('canvas');
        const aspectRatio = logoImg.width / logoImg.height;
        const logoWidth = 60; // Width in mm
        const logoHeight = logoWidth / aspectRatio;
        
        // Set canvas size with appropriate scale for better quality
        canvas.width = logoImg.width;
        canvas.height = logoImg.height;
        
        // Draw the logo on canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(logoImg, 0, 0, logoImg.width, logoImg.height);
        
        // Get data URL and add to PDF
        const logoDataUrl = canvas.toDataURL('image/png');
        doc.addImage(logoDataUrl, 'PNG', 75, 15, logoWidth, logoHeight);
        
      } catch (e) {
        console.error('Error adding logo to PDF:', e);
      }
      
      // Add document text
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0); // Black
      const text = 'Sirva la presente carta para autorizar a Autolicencia LLC, DBA Cesco Online y sus gestores autorizados a tramitar cualquier gestión necesaria ante el Departamento de Transportación y Obras Públicas, CESCO, DISCO, Autocríptalo y agencia necesaria para el procesamiento de mi licencia de conducir y/o gestiones vehiculares.';
      
      // Simple text wrapping function
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, 20, 50);
      
      // Add closing text
      doc.text('Gracias,', 20, 80);
      
      // Add signature
      if (formData.signature) {
        try {
          const signatureUrl = URL.createObjectURL(formData.signature);
          
          // Create a temporary image to load the signature
          const signatureImg = new Image();
          signatureImg.src = signatureUrl;
          
          await new Promise((resolve) => {
            signatureImg.onload = resolve;
            setTimeout(resolve, 1000); // Timeout as fallback
          });
          
          // Add signature to PDF with proper dimensions
          const canvas = document.createElement('canvas');
          canvas.width = signatureImg.width;
          canvas.height = signatureImg.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(signatureImg, 0, 0);
          const signatureDataUrl = canvas.toDataURL('image/png');
          
          doc.addImage(signatureDataUrl, 'PNG', 20, 90, 50, 20);
          
          // Clean up
          URL.revokeObjectURL(signatureUrl);
        } catch (e) {
          console.error('Error adding signature to PDF:', e);
        }
      }
      
      // Add current date
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
      
      // Add name and date
      doc.setFontSize(10);
      doc.setTextColor(COLORS.primary.replace('#', ''));
      doc.text(userName, 20, 120);
      doc.setTextColor(0, 0, 0); // Reset to black
      doc.text(userAddress, 20, 125);
      doc.text(formattedDate, 20, 130);
      
      // Generate PDF blob and create URL
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Set the PDF URL and show preview
      setPdfPreviewUrl(pdfUrl);
      setShowPreview(true);
      
      console.log('📄 PDF document preview generated successfully');
    } catch (error) {
      console.error('❌ Error generating PDF document preview:', error);
    }
  };
  
  // Close document preview
  const closePreview = () => {
    setShowPreview(false);
    // Clean up the URL object when closing the preview
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
  };

  // Step 1: Instructions and Document List
  const renderInstructionsStep = () => (
    <div className="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Illustration and Title */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-64 h-64 mb-4">
            <DotLottiePlayer
              src="/json/chicolentes.json"
              autoplay={true}
              loop={true}
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#147A31]">Uploading your photos</h2>
            <p className="text-lg text-gray-600">and documents will be super easy.</p>
          </div>
        </div>

        {/* Right Column - Form Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-[#147A31] mb-2">Completed form</h3>
            <p className="text-gray-600">
              1. Formulario DTOP-USC-264 "Solicitud certificado Licencia para conducir vehículos de motor".
            </p>
          </div>

          <div className="bg-[#6949FF] text-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">Indications</h3>
            <div className="space-y-2">
              <p>1. Suba los documentos requeridos para su trámite uno a uno.</p>
              <p>2. Una vez subas la primera, pasa a la segunda y luego a la tercera y así sucesivamente. Al finalizar, oprime el botón "finalizar". A continuación adjunte los siguientes documentos. Se requiren para continuar con el proceso de su trámite.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          variant="primary"
          onClick={nextStep}
        >
          Next
        </Button>
      </div>
    </div>
  );

  // Step 2: Selfie Upload with auto-activated camera
  const renderSelfieStep = () => (
    <div className="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-64 h-64 mb-4">
            <DotLottiePlayer
              src="/json/chicolentes.json"
              autoplay={true}
              loop={true}
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#147A31]">Let's take a</h2>
            <h2 className="text-2xl font-bold text-[#6949FF]">selfie first!</h2>
            <p className="text-lg text-gray-600 mt-2">Smile and take a selfie.</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-600 mb-4">
              Note: Make sure your face is well lit and the image is clear. (Photograph must be taken against a white background.)
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {formData.selfie ? (
                <div className="space-y-4">
                  <img 
                    src={URL.createObjectURL(formData.selfie)} 
                    alt="Selfie preview" 
                    className="max-w-full h-auto mx-auto rounded-lg"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleFileChange('selfie', null);
                      startCamera(); // Restart camera after deleting photo
                    }}
                  >
                    Redo photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cameraError ? (
                    <div className="bg-red-50 p-4 rounded-lg text-red-600">
                      <p>{cameraError}</p>
                      <p className="mt-2 text-sm">Please allow camera access or use the file upload option below.</p>
                    </div>
                  ) : (
                    <>
                      <video 
                        ref={videoRef}
                        autoPlay 
                        playsInline 
                        className="w-full h-auto rounded-lg border border-gray-200 bg-black"
                        style={{ display: isCameraActive ? 'block' : 'none' }}
                        onCanPlay={() => videoRef.current.play()}
                      />
                      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    </>
                  )}
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    {isCameraActive && (
                      <Button
                        variant="primary"
                        onClick={takePhoto}
                      >
                        Take Photo
                      </Button>
                    )}
                    
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="selfieUpload"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          handleFileChange('selfie', e.target.files[0]);
                          stopCamera(); // Stop camera after uploading a file
                        }
                      }}
                    />
                    <label htmlFor="selfieUpload">
                      <Button
                        variant="secondary"
                        as="span"
                      >
                        Upload from device
                      </Button>
                    </label>
                      
                    {cameraError && (
                      <Button
                        variant="secondary"
                        onClick={startCamera}
                      >
                        Retry Camera
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="secondary"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={!formData.selfie}
        >
          Next
        </Button>
      </div>
    </div>
  );

  // Step 3: Digital Signature
  const renderSignatureStep = () => (
    <div className="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-64 h-64 mb-4">
            <DotLottiePlayer
              src="/json/chicolentes.json"
              autoplay={true}
              loop={true}
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#147A31]">Now we need your</h2>
            <h2 className="text-2xl font-bold text-[#6949FF]">digital signature</h2>
            <p className="text-lg text-gray-600 mt-2">Simply sign in the box using your finger or mouse</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-600 mb-4">Please sign below. Try to make your signature as clear as possible.</p>

            <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
              {/* Signature canvas with touch and mouse support */}
              <div className="relative">
                {!hasSignature && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400">
                    Sign here
                  </div>
                )}
                <canvas 
                  ref={signatureCanvasRef}
                  className="w-full h-40 touch-none cursor-crosshair bg-white rounded"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="termsAccept"
                  className="h-4 w-4 text-[#147A31] border-gray-300 rounded"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="termsAccept" className="ml-2 text-sm text-gray-600">
                  I accept the Terms and Conditions
                </label>
              </div>

              <div className="flex gap-4 mt-6 flex-wrap">
                <Button 
                  variant="secondary"
                  onClick={clearSignature}
                >
                  Clear
                </Button>
                <Button 
                  variant="primary"
                  onClick={saveSignatureImage}
                  disabled={!hasSignature}
                >
                  Save Signature
                </Button>
                <Button 
                  variant="secondary"
                  onClick={showDocumentPreview}
                  disabled={!formData.signature}
                >
                  Preview Document
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="secondary"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={!formData.signature || !termsAccepted}
        >
          Next
        </Button>
      </div>
    </div>
  );

  // Step 4: Document Upload
  const renderDocumentUploadStep = () => (
    <div className="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-64 h-64 mb-4">
            <DotLottiePlayer
              src="/json/chicolentes.json"
              autoplay={true}
              loop={true}
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#147A31]">Upload your</h2>
            <h2 className="text-2xl font-bold text-[#6949FF]">documents</h2>
            <p className="text-lg text-gray-600 mt-2">The final step in your application</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-[#147A31] mb-4">Required Documents</h3>
            
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Social Security Card</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    id="socialSecurityUpload"
                    onChange={(e) => handleFileChange('documents.socialSecurity', e.target.files[0])}
                  />
                  <label htmlFor="socialSecurityUpload">
                    <Button
                      variant="secondary"
                      as="span"
                      size="sm"
                    >
                      {formData.documents.socialSecurity ? 'Change' : 'Upload'}
                    </Button>
                  </label>
                </div>
                {formData.documents.socialSecurity && (
                  <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>
                )}
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Birth Certificate</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    id="birthCertificateUpload"
                    onChange={(e) => handleFileChange('documents.birthCertificate', e.target.files[0])}
                  />
                  <label htmlFor="birthCertificateUpload">
                    <Button
                      variant="secondary"
                      as="span"
                      size="sm"
                    >
                      {formData.documents.birthCertificate ? 'Change' : 'Upload'}
                    </Button>
                  </label>
                </div>
                {formData.documents.birthCertificate && (
                  <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>
                )}
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Proof of Address</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    id="proofOfAddressUpload"
                    onChange={(e) => handleFileChange('documents.proofOfAddress', e.target.files[0])}
                  />
                  <label htmlFor="proofOfAddressUpload">
                    <Button
                      variant="secondary"
                      as="span"
                      size="sm"
                    >
                      {formData.documents.proofOfAddress ? 'Change' : 'Upload'}
                    </Button>
                  </label>
                </div>
                {formData.documents.proofOfAddress && (
                  <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="secondary"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate('/dashboard')}
        >
          Finish
        </Button>
      </div>
    </div>
  );

  // Render the appropriate step based on current state
  const renderStep = () => {
    switch (step) {
      case 1:
        return renderInstructionsStep();
      case 2:
        return renderSelfieStep();
      case 3:
        return renderSignatureStep();
      case 4:
        return renderDocumentUploadStep();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7fdf9]">
      <HeaderProcedure title="License Renewal - Upload Documents" />
      <main className="flex-grow py-8">
        <Container size="lg">
          {renderStep()}
        </Container>
      </main>
      
      {/* PDF Document Preview Modal */}
      {showPreview && pdfPreviewUrl && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Previsualización del documento</h3>
              <button 
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 p-0 bg-white">
              {/* PDF Viewer using browser's built-in PDF viewer with iframe for better display */}
              <iframe
                src={pdfPreviewUrl}
                title="PDF Preview"
                className="w-full h-full border-none"
                style={{ minHeight: "70vh" }}
              >
                <p className="text-center p-4">
                  Your browser doesn't support PDF preview.
                  <a 
                    href={pdfPreviewUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 underline ml-2"
                  >
                    Download PDF
                  </a>
                </p>
              </iframe>
            </div>
            
            <div className="p-4 border-t flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={closePreview}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  closePreview();
                  nextStep();
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default LicenseRenewalUpload; 
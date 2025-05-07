import React, { useState, useEffect } from 'react';
import { Button, Container, DotLottiePlayer, FileUploadField, StepLayout } from '../../components/ui';
import { HeaderProcedure, Footer } from '../../components';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import useCamera from '../../hooks/useCamera';
import useSignature from '../../hooks/useSignature';

// Color constants for consistency
const COLORS = {
  primary: '#147A31',
  secondary: '#147A31',
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
      licensePhotos: null,
      licensePhotosFront: null,
      licensePhotosBack: null
    }
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // PDF Preview state
  const [showPreview, setShowPreview] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  
  // Initialize hooks
  const camera = useCamera();
  const signature = useSignature();

  // Update camera when changing steps
  useEffect(() => {
    if (step === 2) {
      camera.startCamera();
    } else {
      camera.stopCamera();
    }

    return () => {
      // Ensure camera is stopped when component unmounts
      if (step === 2) {
        camera.stopCamera();
      }
    };
  }, [step]);

  // Sync camera photo with form data
  useEffect(() => {
    if (camera.photoFile) {
      handleFileChange('selfie', camera.photoFile);
    }
  }, [camera.photoFile]);

  // Sync signature with form data
  useEffect(() => {
    if (signature.signatureFile) {
      handleFileChange('signature', signature.signatureFile);
    }
  }, [signature.signatureFile]);

  // Cleanup resources on component unmount
  useEffect(() => {
    return () => {
      // Revoke any object URLs to prevent memory leaks
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
      
      // Ensure selfie URL is revoked if it exists
      if (formData.selfie) {
        try {
          URL.revokeObjectURL(URL.createObjectURL(formData.selfie));
        } catch (error) {
          console.error('Error revoking selfie URL:', error);
        }
      }
      
      // Stop camera if active
      camera.stopCamera();
    };
  }, []);

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
    // Special handling for signature step
    if (step === 3 && signature.hasSignature && !formData.signature) {
      // First save the signature, then proceed
      signature.saveSignature();
      
      // Give time for signature to be saved before proceeding
      setTimeout(() => {
        setStep(prev => prev + 1);
        window.scrollTo(0, 0);
      }, 300);
      
      return;
    }
    
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
      // If we have a signature drawing but it's not saved yet, save it first
      if (signature.hasSignature) {
        signature.saveSignature();
        // Wait for signature to be saved
        await new Promise(resolve => setTimeout(resolve, 300));
      } else {
        console.log('⚠️ No signature available for preview');
        return;
      }
    }
    
    try {
      console.log('📄 Generating PDF document preview...');
      
      // Get user data if available
      let userName = 'Juan Pablo Domínguez';
      let userAddress = 'Calle Principal #123, San Juan, PR 00901';
      try {
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
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
      
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Set font and add title
      doc.setFont('helvetica');
      doc.setFontSize(18);
      doc.setTextColor(COLORS.secondary.replace('#', '')); 
      doc.text('Carta de Autorización', 105, 40, { align: 'center' });
      
      // Add logo
      try {
        const logoImg = new Image();
        logoImg.src = '/img/Mesa2.png';
        logoImg.crossOrigin = "Anonymous";
        
        await new Promise((resolve, reject) => {
          logoImg.onload = resolve;
          logoImg.onerror = reject;
          // Set a reasonable timeout
          const timeout = setTimeout(() => {
            console.warn('Logo image load timed out, continuing without logo');
            resolve();
          }, 3000);
          
          // Clear timeout if image loads or errors
          logoImg.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          logoImg.onerror = () => {
            clearTimeout(timeout);
            console.error('Error loading logo image');
            resolve(); // Continue without logo
          };
        });
        
        const canvas = document.createElement('canvas');
        const aspectRatio = logoImg.width / logoImg.height;
        const logoWidth = 60;
        const logoHeight = logoWidth / aspectRatio;
        
        canvas.width = logoImg.width || 100;
        canvas.height = logoImg.height || 100;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(logoImg, 0, 0, logoImg.width, logoImg.height);
        
        const logoDataUrl = canvas.toDataURL('image/png');
        doc.addImage(logoDataUrl, 'PNG', 75, 15, logoWidth, logoHeight);
      } catch (e) {
        console.error('Error adding logo to PDF:', e);
      }
      
      // Add document text
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      const text = 'Sirva la presente carta para autorizar a Autolicencia LLC, DBA Cesco Online y sus gestores autorizados a tramitar cualquier gestión necesaria ante el Departamento de Transportación y Obras Públicas, CESCO, DISCO, Autocríptalo y agencia necesaria para el procesamiento de mi licencia de conducir y/o gestiones vehiculares.';
      
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, 20, 50);
      doc.text('Gracias,', 20, 80);
      
      // Add signature
      if (formData.signature) {
        try {
          const signatureUrl = URL.createObjectURL(formData.signature);
          const signatureImg = new Image();
          signatureImg.src = signatureUrl;
          
          await new Promise((resolve) => {
            const timeout = setTimeout(() => {
              console.warn('Signature image load timed out, continuing without signature');
              resolve();
            }, 3000);
            
            signatureImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            signatureImg.onerror = () => {
              clearTimeout(timeout);
              console.error('Error loading signature image');
              resolve();
            };
          });
          
          const canvas = document.createElement('canvas');
          canvas.width = signatureImg.width || 200;
          canvas.height = signatureImg.height || 100;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(signatureImg, 0, 0);
          const signatureDataUrl = canvas.toDataURL('image/png');
          
          doc.addImage(signatureDataUrl, 'PNG', 20, 90, 50, 20);
          URL.revokeObjectURL(signatureUrl);
        } catch (e) {
          console.error('Error adding signature to PDF:', e);
        }
      }
      
      // Add current date and name
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
      
      doc.setFontSize(10);
      doc.setTextColor(COLORS.primary.replace('#', ''));
      doc.text(userName, 20, 120);
      doc.setTextColor(0, 0, 0);
      doc.text(userAddress, 20, 125);
      doc.text(formattedDate, 20, 130);
      
      // Generate PDF blob and create URL
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
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
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }
  };

  // Step 1: Instructions and Document List
  const renderInstructionsStep = () => (
    <StepLayout
      title="Uploading your photos and documents will be super easy."
      onNext={nextStep}
      showPrevButton={false}
    >
      <div className="bg-white rounded-lg p-4">
        <h3 className="font-semibold text-[#147A31] mb-2">Completed form</h3>
        <p className="text-gray-600">
          1. Formulario DTOP-USC-264 "Solicitud certificado Licencia para conducir vehículos de motor".
        </p>
      </div>

      <div className="bg-[#147A31] text-white rounded-lg p-4">
        <h3 className="font-semibold mb-2">Indications</h3>
        <div className="space-y-2">
          <p>1. Suba los documentos requeridos para su trámite uno a uno.</p>
          <p>2. Una vez subas la primera, pasa a la segunda y luego a la tercera y así sucesivamente. Al finalizar, oprime el botón "finalizar". A continuación adjunte los siguientes documentos. Se requiren para continuar con el proceso de su trámite.</p>
        </div>
      </div>
    </StepLayout>
  );

  // Step 2: Selfie Upload with auto-activated camera
  const renderSelfieStep = () => (
    <StepLayout
      title="Let's take selfie first!"
      subtitle="Smile and take a selfie."
      onNext={nextStep}
      onPrev={prevStep}
      nextDisabled={!formData.selfie}
    >
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
                onLoad={(e) => {
                  // Clean up the object URL after the image loads to prevent memory leaks
                  const src = e.target.src;
                  return () => URL.revokeObjectURL(src);
                }}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  // Revoke the object URL before changing the state
                  if (formData.selfie) {
                    try {
                      const url = URL.createObjectURL(formData.selfie);
                      URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error('Error revoking selfie URL:', error);
                    }
                  }
                  handleFileChange('selfie', null);
                  camera.startCamera();
                }}
              >
                Redo photo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {camera.cameraError ? (
                <div className="bg-red-50 p-4 rounded-lg text-red-600">
                  <p>{camera.cameraError}</p>
                  <p className="mt-2 text-sm">Please allow camera access or use the file upload option below.</p>
                </div>
              ) : (
                <>
                  <video 
                    ref={camera.videoRef}
                    autoPlay 
                    playsInline 
                    className="w-full h-auto rounded-lg border border-gray-200 bg-black"
                    style={{ display: camera.isCameraActive ? 'block' : 'none' }}
                    onCanPlay={() => camera.videoRef.current?.play().catch(err => console.error('Video play error:', err))}
                  />
                  <canvas ref={camera.canvasRef} style={{ display: 'none' }}></canvas>
                </>
              )}
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {camera.isCameraActive && (
                  <Button
                    variant="primary"
                    onClick={camera.takePhoto}
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
                      if (e.target.files[0].size > 10 * 1024 * 1024) {
                        alert("File is too large. Maximum size is 10MB.");
                        return;
                      }
                      handleFileChange('selfie', e.target.files[0]);
                      camera.stopCamera();
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
                  
                {camera.cameraError && (
                  <Button
                    variant="secondary"
                    onClick={camera.startCamera}
                  >
                    Retry Camera
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {!formData.selfie && (
          <p className="text-sm text-red-500 mt-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            A selfie is required to continue
          </p>
        )}
      </div>
    </StepLayout>
  );

  // Step 3: Digital Signature
  const renderSignatureStep = () => (
    <StepLayout
      title="Now we need your digital signature"
      subtitle="Simply sign in the box using your finger or mouse"
      onNext={() => {
        // If there's a signature on canvas but not saved yet, save it first
        if (signature.hasSignature && !formData.signature) {
          try {
            signature.saveSignature();
            // Use a timeout to ensure signature is saved before proceeding
            setTimeout(nextStep, 300);
          } catch (error) {
            console.error('Error saving signature:', error);
            alert('There was an error saving your signature. Please try again.');
          }
        } else {
          nextStep();
        }
      }}
      onPrev={prevStep}
      nextDisabled={!termsAccepted || (!signature.hasSignature && !formData.signature)}
    >
      <div className="bg-white rounded-lg p-4">
        <p className="text-gray-600 mb-4">Please sign below. Try to make your signature as clear as possible.</p>

        <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
          <div className="relative">
            {!signature.hasSignature && !formData.signature && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400">
                Sign here
              </div>
            )}
            <canvas 
              ref={signature.canvasRef}
              className="w-full h-40 touch-none cursor-crosshair bg-white rounded"
              onMouseDown={signature.startDrawing}
              onMouseMove={signature.draw}
              onMouseUp={signature.stopDrawing}
              onMouseLeave={signature.stopDrawing}
              onTouchStart={signature.startDrawing}
              onTouchMove={signature.draw}
              onTouchEnd={signature.stopDrawing}
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
              onClick={() => {
                try {
                  signature.clearSignature();
                  setFormData(prev => ({...prev, signature: null}));
                } catch (error) {
                  console.error('Error clearing signature:', error);
                }
              }}
            >
              Clear
            </Button>
            <Button 
              variant="primary"
              onClick={() => {
                try {
                  signature.saveSignature();
                } catch (error) {
                  console.error('Error saving signature:', error);
                  alert('There was an error saving your signature. Please try again.');
                }
              }}
              disabled={!signature.hasSignature}
            >
              Save Signature
            </Button>
            <Button 
              variant="secondary"
              onClick={showDocumentPreview}
              disabled={!signature.hasSignature && !formData.signature}
            >
              Preview Document
            </Button>
          </div>
          
          {formData.signature && (
            <p className="text-sm text-green-600 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Signature saved successfully
            </p>
          )}
        </div>
        
        {(!signature.hasSignature && !formData.signature) && (
          <p className="text-sm text-red-500 mt-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            A signature is required to continue
          </p>
        )}
        
        {!termsAccepted && (
          <p className="text-sm text-red-500 mt-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            You must accept the Terms and Conditions to continue
          </p>
        )}
      </div>
    </StepLayout>
  );

  // Step 4: Document Upload - First Step (Social Security Card and ID Photos)
  const renderDocumentUploadStep = () => (
    <StepLayout
      title="Upload these first three files"
      subtitle="All fields marked with * are required"
      onNext={nextStep}
      onPrev={prevStep}
      nextDisabled={!formData.documents.socialSecurity || !formData.documents.licensePhotosFront || !formData.documents.licensePhotosBack}
    >
      <div className="bg-white rounded-lg p-4">
        <div className="space-y-6">
          <FileUploadField
            id="socialSecurityUpload"
            label="Social Security Card"
            value={formData.documents.socialSecurity}
            onChange={(file) => {
              if (file && file.size > 10 * 1024 * 1024) {
                alert("File is too large. Maximum size is 10MB.");
                return;
              }
              handleFileChange('documents.socialSecurity', file);
            }}
            required={true}
          />
          
          <FileUploadField
            id="licensePhotosFrontUpload"
            label="Photo ID (Expired or about to expire) - Frontal"
            value={formData.documents.licensePhotosFront}
            onChange={(file) => {
              if (file && file.size > 10 * 1024 * 1024) {
                alert("File is too large. Maximum size is 10MB.");
                return;
              }
              handleFileChange('documents.licensePhotosFront', file);
            }}
            required={true}
          />
          
          <FileUploadField
            id="licensePhotosBackUpload"
            label="Photo ID (Expired or about to expire) - Later"
            value={formData.documents.licensePhotosBack}
            onChange={(file) => {
              if (file && file.size > 10 * 1024 * 1024) {
                alert("File is too large. Maximum size is 10MB.");
                return;
              }
              handleFileChange('documents.licensePhotosBack', file);
            }}
            required={true}
          />
        </div>
        
        {(!formData.documents.socialSecurity || !formData.documents.licensePhotosFront || !formData.documents.licensePhotosBack) && (
          <p className="text-sm text-red-500 mt-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            All marked fields (*) are required to continue
          </p>
        )}
      </div>
    </StepLayout>
  );

  // Step 5: Document Upload - Second Step (Electricity Bill and Birth Certificate)
  const renderDocumentUploadStep2 = () => (
    <StepLayout
      title="Upload these two more files"
      subtitle="You're almost done!"
      onNext={handleSubmit}
      onPrev={prevStep}
      nextLabel="Finish"
      nextDisabled={!formData.documents.proofOfAddress || !formData.documents.birthCertificate}
    >
      <div className="bg-white rounded-lg p-4">
        <div className="space-y-6">
          <FileUploadField
            id="electricityBillUpload"
            label="Electricity Bill"
            value={formData.documents.proofOfAddress}
            onChange={(file) => {
              if (file && file.size > 10 * 1024 * 1024) {
                alert("File is too large. Maximum size is 10MB.");
                return;
              }
              handleFileChange('documents.proofOfAddress', file);
            }}
            required={true}
          />
          
          <FileUploadField
            id="birthCertificateUpload"
            label="Birth certificate / Proof of Residence"
            value={formData.documents.birthCertificate}
            onChange={(file) => {
              if (file && file.size > 10 * 1024 * 1024) {
                alert("File is too large. Maximum size is 10MB.");
                return;
              }
              handleFileChange('documents.birthCertificate', file);
            }}
            required={true}
          />
        </div>
        
        {(!formData.documents.proofOfAddress || !formData.documents.birthCertificate) && (
          <p className="text-sm text-red-500 mt-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            All marked fields (*) are required to continue
          </p>
        )}
      </div>
    </StepLayout>
  );

  // Step 6: Success screen
  const renderSuccessStep = () => {
    // Get user data for personalized message
    let userName = 'Juan Pablo';
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (userData && userData.item) {
        const userItem = userData.item;
        const firstName = userItem.cl_nombre || '';
        
        if (firstName) {
          userName = firstName;
        }
      }
    } catch (error) {
      console.error('Error parsing user data for success screen:', error);
    }
    
    return (
      <div className="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-64 h-64 mb-8">
            <DotLottiePlayer
              src="/json/chicolentes.json"
              autoplay={true}
              loop={true}
            />
          </div>
          
          <h2 className="text-4xl font-bold mb-6 text-[#147A31]">¡Felicitaciones {userName}!</h2>
          
          <p className="text-xl text-gray-700 text-center max-w-xl mb-6">
            Tu trámite ha concluido. Nos pondremos en contacto contigo
            luego de evaluar tu caso.
          </p>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#147A31] text-white hover:bg-[#0f5f26] font-semibold py-3 px-8 rounded-full shadow-sm transition duration-200 text-center w-48"
          >
            Exit
          </button>
        </div>
      </div>
    );
  };

  // Handle final submission
  const handleSubmit = () => {
    try {
      console.log("All documents uploaded:", formData);
      
      // Validate all required documents are present
      const requiredDocs = [
        { name: 'Social Security Card', value: formData.documents.socialSecurity },
        { name: 'Photo ID - Front', value: formData.documents.licensePhotosFront },
        { name: 'Photo ID - Back', value: formData.documents.licensePhotosBack },
        { name: 'Electricity Bill', value: formData.documents.proofOfAddress },
        { name: 'Birth Certificate', value: formData.documents.birthCertificate },
        { name: 'Selfie', value: formData.selfie },
        { name: 'Signature', value: formData.signature }
      ];
      
      const missingDocs = requiredDocs.filter(doc => !doc.value).map(doc => doc.name);
      
      if (missingDocs.length > 0) {
        alert(`The following documents are missing: ${missingDocs.join(', ')}`);
        return;
      }
      
      // Here you would typically send the data to the server
      // For now we'll just move to the success screen
      setStep(6);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting documents:', error);
      alert('There was an error completing your submission. Please try again.');
    }
  };

  // Render the appropriate step based on current state
  const renderStep = () => {
    switch (step) {
      case 1: return renderInstructionsStep();
      case 2: return renderSelfieStep();
      case 3: return renderSignatureStep();
      case 4: return renderDocumentUploadStep();
      case 5: return renderDocumentUploadStep2();
      case 6: return renderSuccessStep();
      default: return null;
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
              <Button variant="secondary" onClick={closePreview}>Close</Button>
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
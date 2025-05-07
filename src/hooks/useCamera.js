import { useState, useRef, useEffect } from 'react';

export default function useCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  // Start camera when component mounts
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
        setPhotoFile(file);
        console.log('📸 Photo taken and saved');
      }
    }, 'image/jpeg', 0.9);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    isCameraActive,
    cameraError,
    photoFile,
    startCamera,
    stopCamera,
    takePhoto,
    setPhotoFile
  };
} 
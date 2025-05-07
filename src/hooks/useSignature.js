import { useState, useRef, useEffect } from 'react';

export default function useSignature() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureContext, setSignatureContext] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  // Initialize canvas when component mounts
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
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
  }, [canvasRef.current]);

  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && signatureContext) {
        const canvas = canvasRef.current;
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
  }, [signatureContext]);

  // Get event coordinates (mouse or touch)
  const getEventCoordinates = (e) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };
    
    const canvas = canvasRef.current;
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

  // Drawing handlers
  const startDrawing = (e) => {
    if (!signatureContext) return;
    
    const { offsetX, offsetY } = getEventCoordinates(e);
    
    signatureContext.beginPath();
    signatureContext.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing || !signatureContext) return;
    
    const { offsetX, offsetY } = getEventCoordinates(e);
    
    signatureContext.lineTo(offsetX, offsetY);
    signatureContext.stroke();
  };

  const stopDrawing = () => {
    if (!signatureContext) return;
    
    signatureContext.closePath();
    setIsDrawing(false);
  };

  const saveSignature = () => {
    if (!canvasRef.current || !hasSignature) return;
    
    try {
      const canvas = canvasRef.current;
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "signature.jpg", { type: "image/jpeg" });
          setSignatureFile(file);
          console.log('✏️ Signature saved');
        }
      }, 'image/jpeg', 0.9);
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  const clearSignature = () => {
    if (!canvasRef.current || !signatureContext) return;
    
    signatureContext.clearRect(
      0, 0, 
      canvasRef.current.width, 
      canvasRef.current.height
    );
    setHasSignature(false);
    setSignatureFile(null);
    console.log('🧹 Signature cleared');
  };

  return {
    canvasRef,
    hasSignature,
    signatureFile,
    startDrawing,
    draw,
    stopDrawing,
    saveSignature,
    clearSignature
  };
} 
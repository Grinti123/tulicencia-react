import React from 'react';

const FileUploadField = ({ 
  id, 
  label, 
  accept = "image/*,.pdf", 
  onChange, 
  value = null,
  required = false 
}) => {
  return (
    <div>
      <p className="text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
        <input
          type="file"
          accept={accept}
          className="hidden"
          id={id}
          onChange={(e) => onChange(e.target.files[0])}
        />
        <label 
          htmlFor={id} 
          className="cursor-pointer w-full text-center"
        >
          <div className="text-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-[#147A31]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-[#147A31] font-medium">{value ? 'Change file' : 'Upload file'}</p>
          </div>
        </label>
        {value && (
          <p className="text-sm text-green-600 mt-1">✓ Uploaded: {value.name}</p>
        )}
      </div>
      {required && !value && (
        <p className="text-sm text-red-500 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          This file is required
        </p>
      )}
    </div>
  );
};

export default FileUploadField; 
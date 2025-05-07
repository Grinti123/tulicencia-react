import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for fetching and managing procedures
 * @returns {Object} The procedures state and utility methods
 */
const useProcedures = () => {
  const [procedures, setProcedures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProcedures = async () => {
    console.log('🔍 Starting to fetch procedures...');
    try {
      setIsLoading(true);
      console.log('📡 Sending request to: https://api.cescoonline.com/api/Tramite/Activos');
      
      const token = localStorage.getItem('token');
      console.log('🔑 Token available:', !!token);
      
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      console.log('📤 Request headers:', headers);
      
      const response = await axios.get('https://api.cescoonline.com/api/Tramite/Activos', { headers });
      
      console.log('✅ Response received:', response.status);
      console.log('📊 Procedures data received:', response.data);
      
      setProcedures(response.data);
      console.log(`📋 Total procedures loaded: ${response.data.length}`);
      
      // Log procedures by type
      const personProcedures = response.data.filter(proc => proc.tr_tipoTramite?.tpr_id === 1);
      const vehicleProcedures = response.data.filter(proc => proc.tr_tipoTramite?.tpr_id === 2);
      console.log(`👤 Person procedures: ${personProcedures.length}`);
      console.log(`🚗 Vehicle procedures: ${vehicleProcedures.length}`);
      
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('❌ Error fetching procedures:', err);
      console.log('📃 Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        responseData: err.response?.data
      });
      
      setError('Failed to load procedures. Please try again later.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 useProcedures hook initialized, fetching procedures...');
    fetchProcedures();
  }, []);

  /**
   * Groups procedures by type (Person or Vehicle)
   * @returns {Object} Object containing grouped procedures
   */
  const groupProceduresByType = () => {
    if (!procedures || procedures.length === 0) {
      console.log('⚠️ No procedures available for grouping');
      return { licenseOptions: [], vehicleOptions: [] };
    }

    // Person type typically has tpr_id 1, Vehicle has tpr_id 2
    const licenseOptions = procedures
      .filter(proc => proc.tr_tipoTramite?.tpr_id === 1)
      .map(proc => ({
        value: proc.tr_id.toString(),
        label: proc.tr_nombre
      }));

    const vehicleOptions = procedures
      .filter(proc => proc.tr_tipoTramite?.tpr_id === 2)
      .map(proc => ({
        value: proc.tr_id.toString(),
        label: proc.tr_nombre
      }));

    console.log('🔍 Grouped procedures:', { 
      licenseOptions: licenseOptions.length, 
      vehicleOptions: vehicleOptions.length 
    });
    
    return { licenseOptions, vehicleOptions };
  };

  /**
   * Find a procedure by its ID
   * @param {string|number} id Procedure ID
   * @returns {Object|null} The procedure object or null if not found
   */
  const getProcedureById = (id) => {
    console.log(`🔍 Searching for procedure with ID: ${id}`);
    const procedure = procedures.find(proc => proc.tr_id.toString() === id.toString()) || null;
    console.log(procedure ? `✅ Procedure found: ${procedure.tr_nombre}` : '❌ Procedure not found');
    return procedure;
  };

  return {
    procedures,
    isLoading,
    error,
    fetchProcedures, // For manual refresh
    groupProceduresByType,
    getProcedureById
  };
};

export default useProcedures; 
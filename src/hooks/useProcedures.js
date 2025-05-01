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
    try {
      setIsLoading(true);
      const response = await axios.get('https://api.cescoonline.com/api/Tramite/Activos');
      setProcedures(response.data);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching procedures:', err);
      setError('Failed to load procedures. Please try again later.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProcedures();
  }, []);

  /**
   * Groups procedures by type (Person or Vehicle)
   * @returns {Object} Object containing grouped procedures
   */
  const groupProceduresByType = () => {
    if (!procedures || procedures.length === 0) {
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

    return { licenseOptions, vehicleOptions };
  };

  /**
   * Find a procedure by its ID
   * @param {string|number} id Procedure ID
   * @returns {Object|null} The procedure object or null if not found
   */
  const getProcedureById = (id) => {
    return procedures.find(proc => proc.tr_id.toString() === id.toString()) || null;
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
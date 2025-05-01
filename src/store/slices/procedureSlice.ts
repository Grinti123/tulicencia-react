import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Procedure } from '../../types';

interface ProcedureState {
  procedures: Procedure[];
  currentProcedure: Procedure | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProcedureState = {
  procedures: [],
  currentProcedure: null,
  isLoading: false,
  error: null,
};

const procedureSlice = createSlice({
  name: 'procedure',
  initialState,
  reducers: {
    setProcedures: (state, action: PayloadAction<Procedure[]>) => {
      state.procedures = action.payload;
      state.error = null;
    },
    setCurrentProcedure: (state, action: PayloadAction<Procedure>) => {
      state.currentProcedure = action.payload;
      state.error = null;
    },
    addProcedure: (state, action: PayloadAction<Procedure>) => {
      state.procedures.push(action.payload);
    },
    updateProcedure: (state, action: PayloadAction<Procedure>) => {
      const index = state.procedures.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.procedures[index] = action.payload;
        if (state.currentProcedure?.id === action.payload.id) {
          state.currentProcedure = action.payload;
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearProcedures: (state) => {
      state.procedures = [];
      state.currentProcedure = null;
      state.error = null;
    },
  },
});

export const {
  setProcedures,
  setCurrentProcedure,
  addProcedure,
  updateProcedure,
  setLoading,
  setError,
  clearProcedures,
} = procedureSlice.actions;

export default procedureSlice.reducer;
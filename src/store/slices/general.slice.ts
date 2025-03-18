// Packages
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Constants & Types
import { GeneralState, Theme } from '@/types/store/slices/types';

const initialState: GeneralState = {
  theme: (localStorage.getItem('academia-theme') as Theme) || 'light',
};

// Helper functions
const updateRootContainerClass = (theme: Theme) => {
  const rootContainer = document.querySelector('.RootContainer');
  if (rootContainer) {
    rootContainer.classList.remove('light', 'dark');
    rootContainer.classList.add(theme);
  }
};


// Configuring Slice
const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // Theme actions
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('academia-theme', state.theme);
      updateRootContainerClass(state.theme);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('academia-theme', action.payload);
      updateRootContainerClass(action.payload);
    },

  }
});


export const { toggleTheme, setTheme } = generalSlice.actions;
export default generalSlice.reducer;
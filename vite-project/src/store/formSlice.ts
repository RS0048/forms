import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  email: string;
  password1: string;
  password2: string;
  gender: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  password1: '',
  password2: '',
  gender: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;

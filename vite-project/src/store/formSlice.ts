import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  email: string;
  age: number;
  password1: string;
  password2: string;
  gender: string;
  terms: boolean;
}

const initialState: FormState = {
  name: '',
  email: '',
  age: 0,
  password1: '',
  password2: '',
  gender: '',
  terms: false,
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

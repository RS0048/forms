import { createSlice } from '@reduxjs/toolkit';

interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: [
    'Australia',
    'Brazil',
    'Canada',
    'China',
    'India',
    'Germany',
    'France',
    'Japan',
    'Russia',
    'United Kingdom',
    'United States',
  ],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export default countrySlice.reducer;

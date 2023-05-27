import { createSlice } from "@reduxjs/toolkit";
// types

export interface SettingsState {
  eye_color_options: string[];
  hair_color_options: string[];
  blood_group_options: string[];
  department_options: string[];
}

const initialSettingState: SettingsState = {
  eye_color_options: [],
  hair_color_options: [],
  blood_group_options: [],
  department_options: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettingState,
  reducers: {
    setSettingsData(state, { payload }) {
      state.eye_color_options = payload.eyeColors.sort();
      state.hair_color_options = payload.hairColors.sort();
      state.blood_group_options = payload.bloodTypes.sort();
      state.department_options = payload.departments.sort();
      // state.department_options.unshift("All");
    },
  },
});

export const { setSettingsData } = settingsSlice.actions;
export const settingsFromRedux = (state: SettingsState) => state;

export default settingsSlice.reducer;

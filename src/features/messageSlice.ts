import { createSlice } from '@reduxjs/toolkit';
import MessageService from '../services/MessageService';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    msgs: [],
    organizationId: 'LB2Qt9KLKD',
  },
  reducers: {
    setOrganizationId: (state, action) => {
      return { ...state, organizationId: action.payload };
    },
  },
});

export const { setOrganizationId } = messageSlice.actions;

export const initToken = async (authData: any = null) => {
  try {
    const data: any = await MessageService.initToken(authData);
    localStorage.setItem('super8', JSON.stringify(data));
  } catch (error) {
    // todo
  }
};

export const getToken = async () => {
  try {
    const data = await MessageService.getTwilioToken();
    return data;
  } catch (error) {
    // todo
    return null;
  }
};

export const getMessages = async () => {
  try {
    const data = await MessageService.getMessages();
    return data;
  } catch (error) {
    // todo
    return null;
  }
};

export const organizationId = (state: any) => {
  return state.message.organizationId;
};

export default messageSlice.reducer;

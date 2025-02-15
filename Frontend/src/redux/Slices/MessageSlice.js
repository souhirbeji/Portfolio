import { createSlice } from '@reduxjs/toolkit';
import { sendMessage, fetchMessages, replyToMessage } from './MessageThunk';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    error: null,
    currentMessage: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.unshift(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Reply to Message
      .addCase(replyToMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(replyToMessage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.messages.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(replyToMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearError, setCurrentMessage } = messageSlice.actions;
export default messageSlice.reducer;
export { sendMessage, fetchMessages, replyToMessage };
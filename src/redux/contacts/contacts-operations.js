import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const { data } = await axios.get("/contacts");
    return data;
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }) => {
    const contact = { name, number };
    const { data } = await axios.post("/contacts", contact);
    return data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      const { status } = await axios.delete(`/contacts/${contactId}`);
      if (status === 200) {
        return contactId;
      }
      return rejectWithValue();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

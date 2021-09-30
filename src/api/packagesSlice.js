import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.config";

export const getPackageDetails = createAsyncThunk(
  "packages/getPackageDetails",
  async (_, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/packageDetails",
        {},
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const paymentGateway = createAsyncThunk(
  "packages/paymentGateway",
  async ({ year }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/test_paymentGateway",
        { packagearr: { 8: 1 }, packagetype: "RAZORPAY", year },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const paymentResponse = createAsyncThunk(
  "packages/paymentResponse",
  async ({ orderId, razorpay_payment_id }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/success",
        { orderId, razorpay_payment_id },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  "packages/getAllTransactions",
  async (_, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/transactions",
        {},
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const viewTransaction = createAsyncThunk(
  "packages/viewTransaction",
  async ({ payment_id }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/view_transaction",
        { payment_id },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  packageDetails: {},
  paymentGateway: "",
  paymentResponse: "",
  allTransactions: [],
  viewTransaction: "",
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    resetViewTransaction: (state) => {
      state.viewTransaction = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPackageDetails.fulfilled, (state, action) => {
      state.packageDetails = action.payload;
    });
    builder.addCase(paymentGateway.fulfilled, (state, action) => {
      state.paymentGateway = action.payload;
    });
    builder.addCase(paymentResponse.fulfilled, (state, action) => {
      state.paymentResponse = action.payload;
    });
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      state.allTransactions = action.payload;
    });
    builder.addCase(viewTransaction.fulfilled, (state, action) => {
      state.viewTransaction = action.payload;
    });
  },
});

export const { resetViewTransaction } = packagesSlice.actions;
export default packagesSlice.reducer;

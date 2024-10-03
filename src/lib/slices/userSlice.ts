import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_API } from "../../utils/constants";
import { CustomError } from "../../utils/interfaces";
import {
  SummarizedAssets,
  TransactionData,
  UserRecords,
} from "../../interfaces";

export interface User {
  userRecords: UserRecords;
  walletConnected: boolean;
  walletSelectionOpen: boolean;
  userWalletAddress: string | null;
  connectingWallet: boolean;
  walletName: string | null;
  fetchingWalletInfo: boolean;
  lockingAqua: boolean;
  providingLp: boolean;
  providedLp: boolean;
  lockedAqua: boolean;
}

const initialState = {} as User;

export const mint = createAsyncThunk(
  "lock/mint",
  async (
    values: {
      assetCode: string;
      assetIssuer: string;
      amount: string;
      signedTxXdr: string;
      senderPublicKey: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${BACKEND_API}/token/lock`, values);
      return data;
    } catch (error: any) {
      const customError: CustomError = error;

      if (customError.response && customError.response.data.error.message) {
        return rejectWithValue(customError.response.data.error.message);
      }

      throw new Error(customError.message || "An unknown error occurred");
    }
  }
);

export const getAccountInfo = createAsyncThunk(
  "user/info",
  async (account: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_API}/token/user?userPublicKey=${account}`
      );
      return data;
    } catch (error: any) {
      const customError: CustomError = error;

      if (customError.response && customError.response.data.error.message) {
        return rejectWithValue(customError.response.data.error.message);
      }

      throw new Error(customError.message || "An unknown error occurred");
    }
  }
);

export const storeAccountBalance = createAsyncThunk(
  "user/record",
  async (values: any[], { rejectWithValue }) => {
    try {
      return values;
    } catch (error: any) {
      const customError: CustomError = error;

      if (customError.response && customError.response.data.error.message) {
        return rejectWithValue(customError.response.data.error.message);
      }

      throw new Error(customError.message || "An unknown error occurred");
    }
  }
);

export const addLP = createAsyncThunk(
  "lock/mint",
  async (values: TransactionData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_API}/token/add-liquidity`,
        values
      );
      return data;
    } catch (error: any) {
      const customError: CustomError = error;

      if (customError.response && customError.response.data.error.message) {
        return rejectWithValue(customError.response.data.error.message);
      }

      throw new Error(customError.message || "An unknown error occurred");
    }
  }
);

export const provideLiquidity = createAsyncThunk(
  "liquidity/provide",
  async (
    values: {
      asset1: {
        code: string;
        issuer: string;
        amount: string;
      };
      asset2: {
        code: string;
        issuer: string;
        amount: string;
      };
      signedTxXdr: string;
      senderPublicKey: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_API}/token/add-liquidity`,
        values
      );
      return data;
    } catch (error: any) {
      const customError: CustomError = error;

      if (customError.response && customError.response.data.error.message) {
        return rejectWithValue(customError.response.data.error.message);
      }

      throw new Error(customError.message || "An unknown error occurred");
    }
  }
);

export const withdrawLP = createAsyncThunk(
  "liquidity/withdraw",
  async (
    values: {
      senderPublicKey: string;
      userPoolPercentage: number;
      summerizedAssets: SummarizedAssets | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_API}/token/remove-liquidity`,
        values
      );
      return data;
    } catch (error: any) {
      const customError: CustomError = error;

      if (customError.response && customError.response.data.error.message) {
        return rejectWithValue(customError.response.data.error.message);
      }

      throw new Error(customError.message || "An unknown error occurred");
    }
  }
);

export const redeemLPReward = createAsyncThunk(
  "liquidity/withdraw",
  async (
    values: {
      senderPublicKey: string;
      userPoolPercentage: number;
      summerizedAssets: SummarizedAssets | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_API}/token/redeem-reward`,
        values
      );
      return data;
    } catch (error: any) {
      const customError: CustomError = error;

      if (customError.response && customError.response.data.error.message) {
        return rejectWithValue(customError.response.data.error.message);
      }

      throw new Error(customError.message || "An unknown error occurred");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    walletSelectionAction: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      walletSelectionOpen: payload,
    }),
    setUserWalletAddress: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      userWalletAddress: payload,
    }),
    setConnectingWallet: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      connectingWallet: payload,
    }),
    setWalletConnectName: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      walletName: payload,
    }),
    fetchingWalletInfo: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      fetchingWalletInfo: payload,
    }),
    lockingAqua: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      lockingAqua: payload,
    }),
    providingLp: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      providingLp: payload,
    }),
    resetStateValues: (state) => ({
      ...state,
      lockedAqua: false,
      providedLp: false,
    }),
    logOut: (state) => ({
      ...state,
      userRecords: { balances: null, account: null },
      walletConnected: false,
      walletSelectionOpen: false,
      userWalletAddress: null,
      connectingWallet: false,
      walletName: null,
      fetchingWalletInfo: false,
    }),
  },
  extraReducers(builder) {
    //mint
    builder.addCase(mint.pending, (state) => {
      state.lockingAqua = false;
    });

    builder.addCase(mint.fulfilled, (state, {}) => {
      state.lockedAqua = true;
    });

    builder.addCase(mint.rejected, (state) => {
      state.lockingAqua = false;
    });

    //provide lp
    builder.addCase(provideLiquidity.pending, (state) => {
      state.providedLp = false;
    });

    builder.addCase(provideLiquidity.fulfilled, (state, {}) => {
      state.providedLp = true;
    });

    builder.addCase(provideLiquidity.rejected, (state) => {
      state.providedLp = false;
    });

    //store account
    builder.addCase(storeAccountBalance.pending, () => {});

    builder.addCase(storeAccountBalance.fulfilled, (state, { payload }) => {
      state.userRecords.balances = payload;
    });

    builder.addCase(storeAccountBalance.rejected, () => {});

    //get user account details from db
    builder.addCase(getAccountInfo.pending, () => {});

    builder.addCase(getAccountInfo.fulfilled, (state, { payload }) => {
      state.userRecords.account = payload;
    });

    builder.addCase(getAccountInfo.rejected, () => {});
  },
});

export const {
  logOut,
  providingLp,
  lockingAqua,
  resetStateValues,
  fetchingWalletInfo,
  setConnectingWallet,
  setWalletConnectName,
  setUserWalletAddress,
  walletSelectionAction,
} = userSlice.actions;

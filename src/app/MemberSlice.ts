import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { gql } from '@apollo/client';
import Query from '@/api/Query';
import GraphClient from '@/api/ApolloClient'

interface Member {
  account: string;
  password: string;
}

enum MemberAuthorityEnum {
  visitor = 1,
  normal = 2,
  admin = 9
}

enum LoginStateEnum {
  notLogin = 'notLogin',
  loading = 'loading',
  alreadyLogin = 'alreadyLogin',
  loginFail = 'loginFail'
}
interface QueryResponse {
  status?: string;
  code?: string;
  data?: any;
}

interface MemberData {
  loginState: LoginStateEnum
  memberData: QueryResponse
  authority: MemberAuthorityEnum
}


const initialState: MemberData = {
  loginState: LoginStateEnum.notLogin,
  memberData: {},
  authority: MemberAuthorityEnum.visitor,
}


export const getLoginToken = createAsyncThunk(
  'member/login',
  async(data: Member) => {
    const response: any = await GraphClient.query({
      query: gql`${Query.login}`,
      fetchPolicy: 'no-cache',
      variables: {
        data,
      },
    });
    return response.data
  }
)

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoginToken.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.login.data);
    })
  }

})

export default memberSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listService from './listService'

const initialState = {
    lists: [],
    list: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new list
export const createList = createAsyncThunk('lists/create', async (listData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.createList(listData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createList.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = listSlice.actions
export default listSlice.reducer
import { axiostInstance } from "./axiosInstance";
import { createItemURL, getExtraParamsEndPoint, listItemURL } from "./endpoints";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Item } from "./ItemTypes";

interface ItemsState {
    items: Item[],
    status: 'idle' | 'loading'| 'succeeded' | 'failed',
    error: string | null
}


const initialState: ItemsState = {
    items:[],
    status: 'idle',
    error: null
}


export const fetchItems = createAsyncThunk('items/fetchIems', async (page: number) =>{
    const response = await axiostInstance.get(`${listItemURL}?page=${page}`);
    return response.data;
} )


export const createItem = createAsyncThunk('items/createItem', async(newsItem: Item) =>{
    const response =  await axiostInstance.post(createItemURL, newsItem);
    return response.data;
})


export const updateItem = createAsyncThunk('items/updateItem', async (updateItem: Item) => {
    const response = await axiostInstance.put(getExtraParamsEndPoint(updateItem.id, 'delete'))
    return response.data
})

export const deleteItem = createAsyncThunk('items/deleteItem', async (id:number) => {
    await axiostInstance.delete(getExtraParamsEndPoint(id))
    return id
})



const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch item reducer
        builder.addCase(fetchItems.pending, (state) =>{
            state.status = 'loading'

        })
        .addCase(fetchItems.fulfilled, (state, action:PayloadAction<ItemsState>) => {
            state.status == 'succeeded';
            // expected fetched action payload from our API
            // if successful.
            state.items = action.payload.items;
        })
        .addCase(fetchItems.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || "Failed to fetch items";

        })
        // create Item
        .addCase(createItem.pending, (state) => {
            state.status = 'loading'
        })
        //create the item
        .addCase(createItem.fulfilled, (state, action) => {
            state.status = 'succeeded',
            // push the new item to the list of items 
            // the user created.
            state.items.push(action.payload)
        })
        .addCase(createItem.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || "Failed to create item";

        })
        .addCase(updateItem.fulfilled, (state, action) => {
            // find the index of the item user want to update
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                // successfully updated item from the list
                state.items[index] = action.payload;
            }
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        })
    
    }
})
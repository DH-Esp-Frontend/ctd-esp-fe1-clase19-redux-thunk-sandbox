import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IData, IState } from "./types"


const initialState: IState =  {
  loading: 'success',
  characters: [],
}

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {

    const response = await fetch("https://rickandmortyapi.com/api/character")
    const data: IData = await response.json()

    //Capturamos y retornamos solo los nombres de los personajes
    const names = data.results.map(ch => ch.name)
    return names
  }
)

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    //Logica de reducers comun
    charactersLoading:  (state) => {
        state.loading = 'loading'
    },
    charactersFulfilled: (state, action: PayloadAction<string[]>) => {
        state.loading = 'success'
        state.characters = action.payload
      }
    },

    extraReducers: (builder)  => {
        //Logica de reducers con thunk

        builder
        .addCase(fetchCharacters.pending, (state, action) =>{
          state.loading = "loading"
        })
        .addCase(fetchCharacters.fulfilled, (state, action) =>{
          state.characters.push(...action.payload)
          state.loading = "success"
        })
          .addCase(fetchCharacters.rejected , (state, action) =>{
          state.characters.push("No characters found")
          state.loading = "error"
        })
    }
    
})

export const { charactersLoading, charactersFulfilled } = charactersSlice.actions
export default charactersSlice.reducer


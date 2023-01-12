export interface IState {
    loading:  "loading" | "success" | "error"
    characters: string[]
  }

export type Character = {name: string}

export interface IData {
    results: Character[]
}
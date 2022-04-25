import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {PageList, Page} from "../utils/type"
import api from "../commons/api"
import {Section} from "../utils/type"

interface FormValue {
  path: string
  pageName: string
  status: boolean
  sections: Section[]
}

type Id = string

interface InitialState {
  pageList: PageList
  page: Page
  loading: boolean
}

interface UpdatePage {
  id: string
  formValue: FormValue
}

interface UpdateProductCard {
  id: string
  formValue: {
    idParent: string
    idChildren: string
    idItem: string
    priceLt: number
    priceGt: number
    itemShow: number
  }
}

export const createPage = createAsyncThunk(
  "CREATE_PAGE",
  async (formValue: FormValue) => {
    const res = await api.post("/page/create", formValue)
    return res
  },
)

export const getAllPage = createAsyncThunk("GET_ALL_PAGE", async () => {
  const res = await api.get("/page")
  return res.data
})

export const deletePage = createAsyncThunk("DELETE_PAGE", async (id: Id) => {
  const res = await api.delete(`/page/delete/${id}`)
  return res
})

export const getOnePage = createAsyncThunk("EDIT_PAGE", async (id: Id) => {
  const res = await api.get(`/page/${id}`)
  return res.data.page
})

export const updatePage = createAsyncThunk(
  "UPDATE_PAGE",
  async ({id, formValue}: UpdatePage) => {
    const res = await api.put(`/page/update/${id}`, formValue)

    return res.data.page
  },
)

export const updateCardProduct = createAsyncThunk(
  "UPDATE_CARD_PAGE",
  async ({id, formValue}: UpdateProductCard) => {
    const res = await api.put(`/page/update-card/${id}`, formValue)

    return res.data.page
  },
)

const initialState: InitialState = {
  pageList: [],
  loading: false,
  page: {
    pageName: "",
    path: "",
    id: "",
    _id: "",
    status: false,
    sections: [],
  },
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPage.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createPage.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createPage.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getAllPage.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAllPage.fulfilled, (state, {payload}) => {
      state.loading = false
      state.pageList = payload.pageList
    })
    builder.addCase(getAllPage.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(deletePage.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deletePage.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(deletePage.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getOnePage.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getOnePage.fulfilled, (state, {payload}) => {
      state.loading = false
      state.page = payload
    })
    builder.addCase(getOnePage.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updatePage.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updatePage.fulfilled, (state, {payload}) => {
      state.loading = false
    })
    builder.addCase(updatePage.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updateCardProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateCardProduct.fulfilled, (state, {payload}) => {
      state.loading = false
    })
    builder.addCase(updateCardProduct.rejected, (state) => {
      state.loading = false
    })
  },
})

export default appSlice.reducer

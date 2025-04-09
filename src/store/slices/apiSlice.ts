import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface CatFactResponse {
  fact: string
}

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://catfact.ninja/' }),
  endpoints: (builder) => ({
    getAllCatFacts: builder.query<Record<number, string>, number[]>({
      async queryFn(scores, _queryApi, _extraOptions, baseQuery) {
        try {
          const promises = scores.map(async (score) => {
            const result = await baseQuery(`fact?random=${score}`)
            if (result.error) throw result.error
            const data = result.data as CatFactResponse
            return { score, fact: data.fact }
          })
          const results = await Promise.all(promises)
          const mapping: Record<number, string> = {}
          results.forEach(({ score, fact }) => {
            mapping[score] = fact
          })
          return { data: mapping }
        } catch (error) {
          return { error: error as any }
        }
      }
    })
  })
})

export const { useGetAllCatFactsQuery } = apiSlice

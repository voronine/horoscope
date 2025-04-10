import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { QueryReturnValue, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

export interface CatFactResponse {
  fact: string
}

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://catfact.ninja/' }),
  endpoints: (builder) => ({
    getAllCatFacts: builder.query<Record<number, string>, number[]>({
      async queryFn(
        scores: number[],
        _queryApi,
        _extraOptions,
        baseQuery
      ): Promise<QueryReturnValue<Record<number, string>, FetchBaseQueryError, FetchBaseQueryMeta>> {
        try {
          const responses = await Promise.all(
            scores.map(async (score) => {
              const result = await baseQuery(`fact?random=${score}`)
              if (result.error) throw result.error
              const data = result.data as CatFactResponse
              return { score, fact: data.fact }
            })
          )
          const mapping: Record<number, string> = {}
          responses.forEach(({ score, fact }) => {
            mapping[score] = fact
          })
          return { data: mapping }
        } catch (error: unknown) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : 'Unknown error occurred'
            }
          }
        }
      }
    })
  })
})

export const { useGetAllCatFactsQuery } = apiSlice

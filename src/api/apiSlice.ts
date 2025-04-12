import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { QueryReturnValue, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

export interface CatFactResponse {
  fact: string
}

async function translateToUkrainian(text: string): Promise<string> {
  try {
    const encodedText = encodeURIComponent(text)
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|uk`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Translation error')
    }
    const data = await res.json()
    return data.responseData.translatedText || text
  } catch (error) {
    console.error('Translation failed, returning original text:', error)
    return text
  }
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
              const translatedFact = await translateToUkrainian(data.fact)
              return { score, fact: translatedFact }
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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CatFactResponse {
  fact: string;
}

export const catFactsApi = createApi({
  reducerPath: 'catFactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://catfact.ninja/' }),
  endpoints: (builder) => ({
    getCatFact: builder.query<string, number | void>({
      query: (randomParam) =>
        randomParam ? `fact?random=${randomParam}` : 'fact',
      transformResponse: (response: CatFactResponse) => response.fact,
    }),
  }),
});

export const { useGetCatFactQuery } = catFactsApi;

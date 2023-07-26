import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_TMDB_BASE_URL }),
  tagTypes: ["Popular", "Providers"],

  endpoints: (builder) => ({
    /**
     * Discover Movies
     */
    getDiscover: builder.query({
      query: (type) => `/3/discover/${type === "movies" ? "movie" : "tv"}?api_key=${api_key}&language=en-US&page=1`,
      keepUnusedDataFor: 5,
    }),
    /**
     * Get trending movies
     */
    getTrending: builder.query({
      query: ({ type }) =>
        `/3/trending/${
          type === "movies" ? "movie" : type === "series" ? "tv" : "all"
        }/day?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Get Movies Videos
     */
    getVideo: builder.query({
      query: ({ type, id, original_language }) =>
        `/3/${
          type === "movie" ? "movie" : "tv"
        }/${id}/videos?api_key=${api_key}&language=en-US&include_video_language=${original_language || ""}`,
    }),
    /**
     * Get Movies Logo
     */
    getLogo: builder.query({
      query: ({ type, id }) => `/3/${type === "movie" ? "movie" : "tv"}/${id}/images?api_key=${api_key}`,
    }),
    getRuntime: builder.query({
      query: ({ type, id }) => `/3/${type === "movie" ? "movie" : "tv"}/${id}?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Popular movies
     */
    getPopular: builder.query({
      query: ({ type, page, genre, region, selectedWatchProviders, fromDate, toDate, sort }) =>
        `/3/discover/${type === "movies" ? "movie" : "tv"}?api_key=${api_key}&with_genres=${
          genre.length !== 0 ? genre.join(",") : ""
        }&watch_region=${region ? region : "PH"}&with_watch_providers=${
          selectedWatchProviders.length !== 0 ? selectedWatchProviders.join(",") : ""
        }&${
          type === "movies"
            ? `primary_release_date.gte=${fromDate !== undefined ? fromDate : ""}`
            : `first_air_date.gte=${fromDate !== undefined ? fromDate : ""}`
        }&${
          type === "movies"
            ? `release_date.lte=${toDate !== undefined ? toDate : ""}`
            : `first_air_date.lte=${toDate !== undefined ? toDate : ""}`
        }&sort_by=${sort}&language=en-US&page=${page}`,
      providesTags: ["Popular"],
      keepUnusedDataFor: 5,
      serializeQueryArgs: ({ queryArgs, endpoint }) => {
        const { genre, region, selectedWatchProviders, fromDate, toDate, type, sort } = queryArgs;
        return { genre, region, selectedWatchProviders, fromDate, toDate, type, sort };
      },
      merge: (currentCache, newItems, currentArg) => {
        if (currentArg.arg.page === 1) {
          newItems.results;
        } else {
          currentCache.results.push(...newItems.results);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    /**
     * Get latest movies
     */
    getNowPlaying: builder.query({
      query: ({ type }) =>
        `/3/${type === "movies" ? "movie" : "tv"}/now_playing?api_key=${api_key}&language=en-US&page=1`,
    }),
    /**
     * Upcoming movies
     */
    getUpComingMovie: builder.query({
      query: ({ date }) =>
        `/3/movie/upcoming?api_key=${api_key}&primary_release_date.gte=${date ? date : ""}&language=en-US&page=1`,
    }),
    /**
     * Get media details
     */
    getMediaDetails: builder.query({
      query: ({ type, id }) => `/3/${type === "movie" ? "movie" : "tv"}/${id}?api_key=${api_key}&language=en-US`,
    }),
    getMovieGenre: builder.query({
      query: ({ type }) => `/3/genre/${type === "movies" ? "movie" : "tv"}/list?api_key=${api_key}&language=en`,
    }),
    /**
     * Get regions
     */
    getRegions: builder.query({
      query: () => `/3/watch/providers/regions?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Watch providers
     */
    getWatchProviders: builder.query({
      query: ({ type, selectedRegion }) =>
        `3/watch/providers/${type}?api_key=${api_key}&language=en-US&watch_region=${selectedRegion.iso_3166_1}`,
      providesTags: ["Providers"],
    }),
    /**
     * Popular people
     */
    getPopularPeople: builder.query({
      query: ({ page }) => `/3/person/popular?api_key=${api_key}&language=en-US&page=${page}`,
      serializeQueryArgs: ({ endpoint }) => {
        return endpoint;
      },
      merge: (currentCache, newItems, currentArg) => {
        if (currentArg.arg.page === 1) {
          newItems.results;
        } else {
          currentCache.results.push(...newItems.results);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    /**
     * Person Details endpoint
     */
    getPersonDetails: builder.query({
      query: ({ id }) => `/3/person/${id}?api_key=${api_key}`,
    }),
    getCreditMovies: builder.query({
      query: ({ personId }) => `/3/person/${personId}/combined_credits?api_key=${api_key}`,
    }),
    /**
     * Tv shows
     */
    getPopularTv: builder.query({
      query: () => `/3/tv/on_the_air?api_key=${api_key}&with_origin_country=PH&language=en-US&page=1`,
    }),
    /**
     * Search movies, tv shows etc.
     */
    getSearch: builder.query({
      query: ({ query }) => `/3/search/multi?api_key=${api_key}&query=${query || ""}`,
    }),
    /**
     * Credits
     */
    getCredits: builder.query({
      query: ({ type, id }) =>
        `/3/${type === "movie" ? "movie" : "tv"}/${id}/credits?api_key=${api_key}&language=en-US`,
    }),
    /**
     * Recommendation endpoint
     */
    getRecommendation: builder.query({
      query: ({ id, type }) => `/3/${type}/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`,
    }),
    /**
     * Similar Movies
     */
    getSimilar: builder.query({
      query: ({ id, type }) => `/3/${type}/${id}/similar?api_key=${api_key}`,
    }),
    /**
     * Profile
     */
    getProfile: builder.query({
      query: ({ id }) => `/3/person/${id}/images?api_key=${api_key}`,
    }),
    /**
     * External ids
     */
    getExternalID: builder.query({
      query: ({ id }) => `/3/person/${id}/external_ids?api_key=${api_key}`,
    }),
  }),
});

export const {
  useGetDiscoverQuery,
  useGetNowPlayingQuery,
  useGetUpComingMovieQuery,
  useGetMediaDetailsQuery,
  useGetVideoQuery,
  useGetLogoQuery,
  useGetTrendingQuery,
  useGetRuntimeQuery,
  useGetPopularQuery,
  useGetMovieGenreQuery,
  useGetRegionsQuery,
  useGetWatchProvidersQuery,
  useGetPopularPeopleQuery,
  useGetPopularTvQuery,
  useGetSearchQuery,
  useGetPersonDetailsQuery,
  useGetCreditMoviesQuery,
  useGetCreditsQuery,
  useGetRecommendationQuery,
  useGetSimilarQuery,
  useGetProfileQuery,
  useGetExternalIDQuery,
} = tmdbApi;

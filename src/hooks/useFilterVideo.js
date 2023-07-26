export const useFilterVideo = (data) => {
  const video = data?.results?.find((result) => {
    return (
      (result.type === "Trailer" || result.type === "Teaser") && result.official
    );
  });

  return {
    video,
  };
};

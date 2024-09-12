import { getQueryClient } from "@/app/getQueryClient";
import { filterAnime } from "@/app/services/functions/animes";
import {
  AnilistAnimeStatus,
  Format,
  Season,
  SortBy,
} from "@/utils/types/animeAnilist";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { z } from "zod";
import AnimeCatalogPage from "./AnimeCatalogPage";

const filterPageSearchSchema = z.object({
  page: z.coerce.number().optional(),
  query: z.coerce.string().optional(),
  season: z.nativeEnum(Season).optional(),
  genres: z.coerce.string().optional(),
  year: z.coerce.number().optional(),
  sortBy: z.nativeEnum(SortBy).optional(),
  format: z.nativeEnum(Format).optional(),
  status: z.nativeEnum(AnilistAnimeStatus).optional(),
});

type FilterPageSearchParams = z.infer<typeof filterPageSearchSchema>;

type Validation = {
  data?: FilterPageSearchParams;
  success: boolean;
};

function validateSearch(searchParams: {
  [key: string]: string | string[] | number | undefined;
}): Validation {
  const validationResult = filterPageSearchSchema.safeParse(searchParams);

  if (validationResult.success) {
    return {
      data: validationResult.data,
      success: true,
    };
  } else {
    return {
      success: false,
    };
  }
}

export default function CatalogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | number | undefined };
}) {
  const validateSearchParams = validateSearch(searchParams);

  if (validateSearchParams.success && validateSearchParams.data) {
    const queryClient = getQueryClient();

    const validatedSearchParams = validateSearchParams.data;

    queryClient.prefetchQuery({
      queryKey: [
        "filterAnime",
        validatedSearchParams.query,
        validatedSearchParams.season,
        validatedSearchParams.genres,
        validatedSearchParams.year,
        validatedSearchParams.sortBy,
        validatedSearchParams.format,
        validatedSearchParams.page,
        validatedSearchParams.status,
      ],
      queryFn: () =>
        filterAnime(
          validatedSearchParams.query,
          validatedSearchParams.season,
          validatedSearchParams.genres,
          validatedSearchParams.year,
          validatedSearchParams.sortBy,
          validatedSearchParams.format,
          validatedSearchParams.page,
          validatedSearchParams.status
        ),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AnimeCatalogPage />
      </HydrationBoundary>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
      <p>Oops! There was an error fetching this page.</p>
      <p>Please try again later.</p>
    </div>
  );
}

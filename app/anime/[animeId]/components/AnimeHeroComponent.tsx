import { Bookmark, ChevronDown, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Episode, Status } from "@/utils/types/animeAnilist";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getRatingScore } from "@/utils/functions/reusableFunctions";
import { Data } from "@/utils/types/animeAnify";
import { AnimeInfoAnizip } from "@/utils/types/animeAnizip";
import { UseQueryResult } from "@tanstack/react-query";
import { useChunkEpisodes } from "@/app/services/queries/animes";

type AnimeHeroComponentProps = {
  image?: string;
  cover?: string;
  title?: string;
  description?: string;
  animeId: string;
  totalEpisodes?: number;
  year?: number;
  type?: string;
  status?: string;
  trendingRank?: number;
  genres?: string[];
  rating?: number | null;
  episodesQuery: UseQueryResult<
    {
      anifyEps: Data[];
      anilistEps: Episode[];
      anizipEps: AnimeInfoAnizip;
    },
    Error
  >;
};

export default function AnimeHeroComponent({
  image,
  cover,
  title,
  description,
  totalEpisodes,
  year,
  type,
  status,
  genres,
  rating,
  animeId,
  episodesQuery,
}: AnimeHeroComponentProps) {
  const [starsFillWidthPercentage, setStarsFillWidthPercentage] = useState(0);
  const starsFillWidthRef = useRef<HTMLDivElement | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkEpisodes(episodesQuery.data);

  useEffect(() => {
    setIsMounted(true);
    if (starsFillWidthRef.current && rating) {
      setStarsFillWidthPercentage(rating * 10);
    }
    if (descriptionRef.current) {
      setDescriptionHeight(
        descriptionRef.current.getBoundingClientRect().height
      );
    }
  }, [rating]);

  return (
    <div className="relative flex justify-center w-full text-sm md:text-base">
      <div className="absolute inset-0 w-dvw left-1/2 ml-[-50vw] max-h-[500px] md:max-h-[600px]">
        <div className="absolute bg-black/65 size-full backdrop-blur-[1px]"></div>
        <div className="absolute bg-gradient-to-t from-darkBg from-[percentage:0%_1%] via-transparent to-transparent size-full"></div>
        <img src={cover ?? image} className="object-cover size-full" />
      </div>
      <div className="flex flex-col items-center w-full gap-2 pt-32 pb-12 lg:pt-36 lg:gap-14 xl:gap-16 lg:px-12 xl:px-16 lg:flex-row lg:items-start">
        <div className="aspect-[3/4] h-[230px] sm:h-[280px] lg:h-[300px] xl:h-[320px] rounded-xl overflow-hidden z-10">
          <img src={image} className="object-cover size-full" />
        </div>
        <div className="relative flex flex-col items-center flex-1 gap-3 mt-3 lg:mt-0 lg:items-start">
          <p className="px-8 text-2xl font-semibold text-center lg:text-3xl lg:px-0 lg:text-start line-clamp-2">
            {title}
          </p>
          <div className="items-center hidden gap-4 lg:flex lg:my-1">
            <div
              style={{
                WebkitMaskImage: 'url("/five-stars.svg")',
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
              className="relative w-32 h-5 bg-gray-500 xl:h-6 lg:-ml-2"
            >
              <div
                ref={starsFillWidthRef}
                style={{
                  width: `${starsFillWidthPercentage}%`,
                }}
                className={`absolute bg-amber-400 h-full`}
              ></div>
            </div>
            <p className="text-lg font-semibold">
              <span className="text-mainAccent">
                {rating ? `${getRatingScore(rating)}` : "?"}
              </span>
              /5
            </p>
          </div>
          <div className="flex-col items-center hidden w-full space-y-2 lg:items-start lg:flex">
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex gap-2">
                <p className="text-gray-400">Year:</p>
                <p>{year}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-400">Total Episodes:</p>
                <p>{totalEpisodes}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-400">Status:</p>
                {status && (
                  <p
                    className={cn("font-semibold text-orange-500", {
                      "text-green-500": [
                        Status.Ongoing,
                        Status.RELEASING,
                      ].includes(status as Status),
                      "text-blue-500": [
                        Status.FINISHED,
                        Status.Completed,
                      ].includes(status as Status),
                      "text-red-500": [
                        Status.CANCELLED,
                        Status.Cancelled,
                      ].includes(status as Status),
                    })}
                  >
                    {status}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <p className="text-gray-400">Type:</p>
                <p>{type ? type : "?"}</p>
              </div>
            </div>
            <div className="flex w-full gap-2">
              <p className="text-gray-400">Genres:</p>
              <div className="flex flex-wrap gap-1 max-w-[70%]">
                {genres &&
                  genres.map((genre, i) => (
                    <Link
                      href={`/anime/catalog?genres=${genre}`}
                      key={i}
                      className="hover:text-mainAccent"
                    >
                      {i === genres.length - 1 ? `${genre}` : `${genre},`}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <p>{year}</p>
            <div className="bg-gray-400 rounded-full size-1"></div>
            {status && (
              <p
                className={cn("font-semibold text-orange-500", {
                  "text-green-500": [Status.Ongoing, Status.RELEASING].includes(
                    status as Status
                  ),
                  "text-blue-500": [Status.FINISHED, Status.Completed].includes(
                    status as Status
                  ),
                  "text-red-500": [Status.CANCELLED, Status.Cancelled].includes(
                    status as Status
                  ),
                })}
              >
                {status}
              </p>
            )}
          </div>
          <div className="flex gap-5 my-3">
            {!isMounted ? (
              <motion.button
                disabled={
                  episodesQuery.isLoading ||
                  episodesQuery.isError ||
                  isChunkEpisodesLoading
                }
                onClick={() => {
                  chunkedEpisodes &&
                    router.replace(
                      `/anime/${animeId}/watch?id=${chunkedEpisodes[0].episodes[0].id.replace(
                        /^\//,
                        ""
                      )}`
                    );
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 disabled:bg-fuchsia-800 disabled:text-gray-400 px-4 py-4 rounded-full mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2 bg-mainAccent"
              >
                <Play size={20} />
                <p className="hidden font-medium mobile-m:block">Play Now</p>
              </motion.button>
            ) : (
              <motion.button
                disabled={
                  episodesQuery.isLoading ||
                  episodesQuery.isError ||
                  isChunkEpisodesLoading
                }
                onClick={() => {
                  chunkedEpisodes &&
                    router.replace(
                      `/anime/${animeId}/watch?id=${chunkedEpisodes[0].episodes[0].id.replace(
                        /^\//,
                        ""
                      )}`
                    );
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 disabled:bg-fuchsia-800 disabled:text-gray-400 px-4 py-4 rounded-full mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2 bg-mainAccent"
              >
                <Play size={20} />
                <p className="hidden font-medium mobile-m:block">Play Now</p>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 px-4 py-4 bg-black rounded-full mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2"
            >
              <Bookmark size={20} />
              <p className="hidden font-medium mobile-m:block">Add to List</p>
            </motion.button>
          </div>

          {/*DESCRIPTION*/}
          <div className="relative flex flex-col w-full gap-3 px-2 mt-5 lg:mt-0 lg:px-0 sm:px-5 md:px-8 lg:w-[75%] xl:w-[70%]">
            <p className="text-lg font-semibold lg:hidden">Description</p>
            <motion.div
              animate={{
                height: readMore ? "auto" : "80px",
              }}
              transition={{
                duration: 0.2,
              }}
              style={{
                maskImage:
                  readMore || descriptionHeight <= 80
                    ? ""
                    : "linear-gradient(to bottom, white 1%, transparent)",
                WebkitMaskImage:
                  readMore || descriptionHeight <= 80
                    ? ""
                    : "linear-gradient(to bottom, white 1%, transparent)",
              }}
              className="relative overflow-hidden text-gray-400"
            >
              <p ref={descriptionRef}>
                {`${
                  description
                    ? description.replace(/<[^>]*>/g, "")
                    : "No Description"
                }`}
              </p>
            </motion.div>
            {descriptionHeight > 80 && (
              <motion.div
                animate={{
                  height: readMore ? `${descriptionHeight}px` : "80px",
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute w-full -bottom-3"
              >
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="absolute left-0 flex gap-3 -bottom-6"
                >
                  <p className="text-gray-400">
                    {readMore ? "Read Less" : "Read More"}
                  </p>
                  <motion.div
                    animate={{
                      rotate: readMore ? -180 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <ChevronDown stroke="#9ca3af" />
                  </motion.div>
                </button>
              </motion.div>
            )}
          </div>
          <div className="flex flex-col self-start gap-2 px-2 lg:hidden md:px-8 sm:px-5 mt-14">
            <p className="mb-1 text-lg font-semibold lg:hidden">Details</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <p className="text-gray-400">Year:</p>
                <p className="">{year}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-400">Total Episodes:</p>
                <p className="">{totalEpisodes}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-400">Status:</p>
                {status && (
                  <p
                    className={cn("font-semibold text-orange-500", {
                      "text-green-500": [
                        Status.Ongoing,
                        Status.RELEASING,
                      ].includes(status as Status),
                      "text-blue-500": [
                        Status.FINISHED,
                        Status.Completed,
                      ].includes(status as Status),
                      "text-red-500": [
                        Status.CANCELLED,
                        Status.Cancelled,
                      ].includes(status as Status),
                    })}
                  >
                    {status}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <p className="text-gray-400">Type:</p>
                <p className="">{type ? type : "?"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-400">Genres:</p>
              <div className="flex flex-wrap gap-1">
                {genres &&
                  genres.map((genre, i) => (
                    <Link
                      href={`/anime/catalog?genres=${genre}`}
                      key={i}
                      className="hover:text-mainAccent"
                    >
                      {i === genres.length - 1 ? `${genre}` : `${genre},`}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-400">Score:</p>
              <div className="flex items-center gap-4">
                <div
                  style={{
                    WebkitMaskImage: 'url("/five-stars.svg")',
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                  className="relative w-24 h-4 bg-gray-500"
                >
                  <div
                    ref={starsFillWidthRef}
                    style={{
                      width: `${starsFillWidthPercentage}%`,
                    }}
                    className={`absolute bg-amber-400 h-full`}
                  ></div>
                </div>
                <p className="font-semibold">
                  <span className="text-mainAccent">
                    {rating ? `${getRatingScore(rating)}` : "?"}
                  </span>
                  &nbsp;/ 5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

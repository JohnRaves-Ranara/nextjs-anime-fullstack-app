import Link from "next/link";

type EpisodeCardProps = {
  animeId: string;
  episodeId: string;
  number: number;
  title: string;
  image?: string;
  type?: string;
  replace: boolean;
};

export default function EpisodeCard({
  animeId,
  episodeId,
  number,
  title,
  image,
  type,
  replace,
}: EpisodeCardProps) {
  return (
    <Link
      href={{
        pathname: `/anime/${animeId}/watch`,
        query: {
          id: episodeId.replace(/^\//, ""),
        },
      }}
      replace={replace}
      className="relative flex flex-col gap-2 text-xs md:text-sm aspect-[4/3] group"
    >
      <div className="relative flex-1">
        <div className="absolute font-semibold z-20 px-2 py-[3px] bottom-1 left-1 text-[#E0E0E0] rounded-md bg-black/60">
          {type === "MOVIE" ? `MOVIE` : `Episode ${number}`}
        </div>
        <div className="absolute z-10 grid transition-all rounded-lg opacity-0 place-items-center size-full bg-mainAccent/40 group-hover:opacity-100">
          <div className="grid bg-white rounded-full group/playicon hover:bg-mainAccent size-12 place-items-center">
            <svg
              className="size-[50%] group-hover/playicon:fill-white fill-mainAccent"
              fill="#c026d3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          </div>
        </div>
        <div className="bg-gray-700 rounded-lg size-full">
          <img
            loading="eager"
            src={image}
            className="absolute inset-0 object-cover rounded-lg size-full"
          />
        </div>
      </div>
      <div>
        {/* <p className="text-white">{`Episode ${number}`}</p> */}
        <p className="line-clamp-1">
          {type === "MOVIE"
            ? "FULL"
            : title === `Episode ${number}`
            ? `EP ${number}`
            : title}
        </p>
      </div>
    </Link>
  );
}

"use client"
import { motion } from "framer-motion";
import { Bookmark, Play } from "lucide-react";
import { useRouter } from "next/navigation";

type AnimeHeroComponentProps = {
  image: string;
  cover: string;
  title: string;
  description: string;
  animeId: string;
  trendingRank?: number;
};

export default function TrendingCarouselItem({
  image,
  title,
  description,
  animeId,
  trendingRank,
}: AnimeHeroComponentProps) {

  const router = useRouter()

  return (
    <div className="flex items-end justify-center lg:items-center size-full lg:pt-20">
      <div className="relative flex justify-center w-full lg:w-[1440px] lg:px-16 px-3 sm:px-6">
        <div className="flex w-full gap-16">
          <div className="aspect-[3/4] h-[300px] rounded-xl overflow-hidden z-10 lg:block hidden">
            <img src={image} className="object-cover size-full" />
          </div>
          <div className="z-10 flex-1">
            <div className="flex flex-col sm:w-[80%] xl:w-[70%] gap-4">
              <div className="space-y-3">
                <p className="mb-auto text-lg">
                  <span className="text-2xl font-bold text-mainAccent">
                    #{trendingRank}
                  </span>{" "}
                  in trending
                </p>
                <h1 className="text-xl font-bold sm:text-2xl md:text-3xl line-clamp-2">
                  {title}
                </h1>
              </div>
              <p className="hidden text-gray-400 lg:line-clamp-3">
                {`${description ? description.replace(/<[^>]*>/g, "") : "No Description"}`}
              </p>
              <div className="flex gap-2 sm:gap-4 sm:my-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    router.push(`/anime/${animeId}`);
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-full sm:gap-2 mobile-l:px-4 sm:px-5 bg-mainAccent"
                >
                  <Play size={20} />
                  <p className="text-sm font-medium sm:text-base">Play Now</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1 px-3 py-2 bg-black rounded-full sm:gap-2 mobile-l:px-4 sm:px-5"
                >
                  <Bookmark size={20} />
                  <p className="text-sm font-medium sm:text-base">Add to List</p>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { fetcher, toSocialNumber } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  MessageSquareIcon,
  Share2Icon,
} from "lucide-react";
import Image from "next/image";
import { title } from "process";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const categories = ["Hot", "New", "Controversial", "Rising", "Top"];
  const [category, setCategory] = useState("Hot");

  return (
    <div className="my-3 ml-3 rounded-lg bg-white h-full overflow-auto">
      {/* Header */}
      <h2 className="flex justify-between p-3">
        <span className="font-semibold text-lg px-3">Popular</span>
        <div className="flex gap-3">
          {categories.map((cat, i) => (
            <button
              className={`p-2 px-3 rounded ${
                category == cat ? "bg-gray-100 font-semibold" : ""
              }`}
              onClick={() => setCategory(cat)}
              key={i}
            >
              {cat}
            </button>
          ))}
        </div>
      </h2>

      {/* Posts */}
      <Posts category={category} />
    </div>
  );
}

function Posts({ category }: { category: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    `https://www.reddit.com/r/technology/${category.toLowerCase()}.json?limit=10`,
    fetcher
  );

  const handleRetry = () => {
    mutate(); // Optionally trigger revalidation immediately
  };

  if (isLoading) return <div className="p-5 text-center">Loading...</div>;

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 p-5">
        <p>Error: {error.message}</p>
        <button
          className="bg-gray-200 border px-3 py-2 rounded shadow-sm active:scale-90"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  const _data: {
    title: string;
    name: string;
    thumbnail: string;
    comment: number;
    share: number;
    votes: number;
  }[] = data.data.children.map(
    (i: {
      data: {
        title: string;
        name: string;
        thumbnail: string;
        num_comments: number;
        wls: number;
        ups: number;
      };
    }) => ({
      title: i.data.title,
      name: i.data.name,
      thumbnail: i.data.thumbnail,
      comment: i.data.num_comments,
      share: i.data.wls,
      votes: i.data.ups,
    })
  );
  // console.log(data)

  return (
    <div className="flex flex-col p-3 gap-3">
      {/* <Post
        thumbnail={""}
        title={""}
        name={""}
        userprofile={""}
        comment={0}
        share={0}
        votes={0}
      /> */}
      {_data.map((d, i) => (
        <Post key={i} {...d} />
      ))}
    </div>
  );
}

function Post({
  thumbnail,
  title,
  name,
  userprofile,
  comment,
  share,
  votes,
}: {
  thumbnail: string;
  title: string;
  name: string;
  userprofile?: string;
  comment: number;
  share: number;
  votes: number;
}) {
  return (
    <div className="flex gap-3 p-[10px] rounded border h-[100px] shadow-sm">
      <div className="rounded-lg bg-gray-800 h-[80px] w-[80px] overflow-hidden">
        {thumbnail != "self" && (
          <img
            src={thumbnail}
            alt={"post photo"}
            className="h-[80px]"
          />
        )}
      </div>

      {/* Title */}
      <div className="flex flex-col flex-1 justify-between">
        <div>{title.slice(0,120)}</div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Posted by</span>
            <Image
              src={"/reddit-logo-64.png"}
              alt={"User thumbnail"}
              height={15}
              width={15}
            />
            {name}
          </div>

          {/* <div className="text-gray-300">July 15, 2012 9:43 PM</div> */}
        </div>
      </div>
      {/* action */}
      <div className="flex flex-col justify-between px-5 text-gray-500">
        <div className="flex gap-3 items-center">
          <MessageSquareIcon size={20} /> {comment} Comments
        </div>
        <div className="flex gap-3 items-center">
          <Share2Icon size={20} /> Share
        </div>
        <div className="flex gap-3 items-center">
          <Ellipsis size={20} /> More
        </div>
      </div>
      {/* upvote downvote */}
      <div className="flex flex-col px-5 justify-between [&>*]:px-3 [&>*]:flex [&>*]:justify-center [&>*]:rounded ">
        <div className="text-orange-500 bg-orange-100">
          <ChevronUp size={20} />
        </div>
        <div>{toSocialNumber(votes)}</div>
        <div className="text-orange-500 bg-orange-100">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
}

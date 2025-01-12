import { generateRandomLinearGradient } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Logo from "./logo";

export const LeftSideBar = () => {
  // Dynamically Loaded data on production / live site
  const groups = [
    {
      title: "FAVORITES",
      items: [
        { src: "", label: "r/funymore", count: 156 },
        { src: "", label: "r/breadkingnews", count: 12 },
        { src: "", label: "r/lovestory", count: 0 },
        { src: "", label: "r/gamingfun", count: 8 },
      ],
    },
    {
      title: "REDDIT FEEDS",
      items: [
        { src: "", label: "r/moview", count: 4 },
        { src: "", label: "r/gaming", count: 0 },
        { src: "", label: "r/pics", count: 32 },
        { src: "", label: "r/gifs", count: 0 },
      ],
    },
    {
      title: "COMMUNITY",
      items: [
        { src: "", label: "r/funymore", count: 0 },
        { src: "", label: "r/breadkingnews", count: 0 },
        { src: "", label: "r/gaming", count: 43 },
        { src: "", label: "r/lovestory", count: 12 },
      ],
    },
  ];
  // .slice(0,-1);

  return (
    <aside className="w-[280px] gap-5 flex flex-col p-5 overflow-y-auto">
      <div
        id="filer-by"
        className="text-gray-500 items-center flex justify-between border-2 border-gray-200 p-2 px-3 rounded-lg bg-white "
      >
        <span>Filter by</span>
        <ChevronDown className="" size={20} />
      </div>

      {/*  */}

      {groups.map((data, i) => (
        <Group key={i} {...data} />
      ))}
    </aside>
  );
};

function Group({
  title,
  items,
}: {
  title: string;
  items: { src: string; label: string; count: number }[];
}) {
  return (
    <section>
      <h3 className=" flex my-3">
        <div className="text-base font-semibold">{title}</div>
        <div className="ml-auto text-gray-200">All</div>
      </h3>
      <div className="flex gap-3 flex-col">
        {items.map(({ src, label, count }, i) => (
          <div key={i} className="flex gap-3 text-gray-700">
            <div
              className="rounded-full h-[24px] w-[24px]"
              style={{ background: generateRandomLinearGradient() }}
            >
              {src && <Image height={24} width={24} alt="Photo" src={src} />}
            </div>
            <div className=" cursor-pointer">{label}</div>
            <div className="ml-auto cursor-pointer">
              {count > 0 ? count : ""}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const RightSideBar = () => {
  return (
    <aside className="w-[300px] flex flex-col p-3">
        <Image src="/sale.jpg" height={300} width={300} alt="sale" className="rounded-lg border" />
        <div className="flex items-center justify-center flex-col gap-5 p-3 pt-8 mt-3 rounded-lg bg-white">
          <Logo/>
          <div>Advertise on Reddit</div>
          <button className="border-orange-500 text-orange-500 rounded bg-white p-2 w-full border-2">GET STARTED</button>
        </div>
    </aside>
  );
};

import {
  AArrowDown,
  ArrowUp10,
  ChevronDown,
  HomeIcon,
  MailIcon,
  MessageSquareIcon,
  SearchIcon,
  Sun,
  UserIcon,
} from "lucide-react";
import Logo from "./logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-[60px] px-5 gap-x-16 items-center ">
      <div className="flex gap-5 items-center">
        <Sun size={25} />
        <Logo />
      </div>

      {/* Center Part */}
      <nav className="mx-auto  flex gap-8 [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
        <Link href={"/#"}>
          <HomeIcon size={20} />
          Home
        </Link>
        <Link href={"/#"} className="text-orange-500">
          <ArrowUp10 size={20} />
          Popular
        </Link>
        <Link href={"/#"}>
          <AArrowDown size={20} />
          All
        </Link>

        {/* Search Component */}
        <div
          id="search-container "
          className=" px-3 rounded w-[400px] border bg-gray-100 flex-1"
        >
          <SearchIcon size={20} color="#888" />
          <input
            className=" p-2 rounded outline-none w-full bg-transparent "
            placeholder="Find community or post"
          />
        </div>

        {/* Create post button */}
        <button className="bg-[#FF4500] text-white p-2 px-4 rounded-md">
          Create Post
        </button>
      </nav>

      {/* Right Navbar part */}
      <div className="flex gap-9">
        <MessageSquareIcon size={20} />
        <MailIcon size={20} />
        <div id="profile-pic" className="flex items-center">
          <UserIcon size={25} className="bg-gray-200 rounded-full gap-2" />
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}

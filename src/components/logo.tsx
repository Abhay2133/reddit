import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-1 items-center">
      <Image
        src={"/reddit-logo-64.png"}
        height={40}
        width={40}
        alt="Reddit Logo"
      />
      <span className="text-xl">reddit</span>
    </div>
  );
}

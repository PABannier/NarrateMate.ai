import Link from "next/link";
import Image from "next/image";
import description from "../../../../../description";
import logo from "@/app/component.png";

export default function LogoHeader() {
  return (
    <header className="h-fit">
      <div className="flex lg:flex-1">
        <Link
          className="flex items-center gap-2 shrink-0 "
          href="/"
          title={`${description.appName} homepage`}
        >
          <Image
            src={logo}
            alt={`${description.appName} logo`}
            className="w-12 rounded-xl"
            priority={true}
            width={50}
            height={50}
          />
          <h2 className="font-bold tracking-tight text-base md:text-lg">
            NarrateMate.ai
          </h2>
        </Link>
      </div>
    </header>
  );
}

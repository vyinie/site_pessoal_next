import "./styles.css"
import Image from "next/image";
import MyPic from "@/public/_images/home/apresentationPic.png"

import TextAnimation from "./TextAnimation";
import ContactLinks from "./contactLinks";

export function HomeIntro() {
  return (
    <div className="flex flex-wrap items-center content-center justify-center w-screen h-screen gap-10">
      <Image
        className="min-w-[250px] w-[25vw] rounded-full shadow-md animate-intro"
        src={MyPic}
        alt="my_picture"
      />

      <div className="relative flex flex-col font-bold uppercase w-fit">
        <h1 className="tracking-wide title mobile-sm:tracking-tight w-fit">
          desenvolvedor
        </h1>

        <div className="subtitleContainer">
          <h1 className="text-sky-500 title mobile-sm:tracking-tight">react</h1>
          <TextAnimation />
        </div>

        <ContactLinks />
      </div>
    </div>
  );
}

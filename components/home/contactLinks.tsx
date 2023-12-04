import githubImg from "/public/_images/contact/github.png";
import curriculoImg from "/public/_images/contact/curriculo.png";
import linkedinImg from "/public/_images/contact/linkedin.png";

import Image from "next/image";

export default function ContactLinks() {
  const links = [
    {
      link: "https://github.com/vyinie",
      img: githubImg,
      alt: "GitHub",
      id: "github",
    },
    {
      id: "linkedin",
      link: "https://linkedin.com/in/marcus-xavier-023008248",
      img: linkedinImg,
      alt: "LinkedIn",
    },
    {
      id: "curriculo",
      link: "/files/curriculo Marcus Xavier.pdf",
      img: curriculoImg,
      alt: "Curriculo",
      download: "curriculo_Marcus_Xavier",
    },
  ];
  return (
    <div className="flex items-center justify-around w-full h-12 mt-4 sm:mt-8">
      {links.map((i) => (
        <a
          target="_blank"
          key={i.id}
          href={i.link}
          className="w-12 h-12"
          title={i.alt}
          download
        >
          <Image className="imgLink" src={i.img} alt={i.alt} />
        </a>
      ))}
    </div>
  );
}

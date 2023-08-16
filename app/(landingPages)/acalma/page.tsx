import Img from "/public/_images/projectsItems/landingPages/acAlma/HomeImg.png";
import "./style.css";
import BackIcon from "@/components/projects/components/BackIcon";
import Image from "next/image";
import AcLinks from "./AcLinks";

function CursoMeditacao() {
  return (
    <div className="w-full desktop:h-full laptop:h-full bg-neutral-800 text-white body">
      <header className="w-full min-h-[80px] flex items-center justify-around text-3xl header">
        <BackIcon className="top-5 w-16" />

        <p className="flex tablet:block mobile-sm:block text-center">
          Curso de <p className="text-purple-550 ml-2"> Meditação</p>
        </p>

        <span className="flex gap-8 items-center text-lg">
          <AcLinks />
          <p className="border-2 border-purple-550 py-2 px-5 rounded-lg cursor-pointer transition-all atHeader ACloginBtn moblet:hidden">
            ja tem uma conta?
          </p>
          <span className="arrow">
            <p className="v">V</p>
          </span>
        </span>
      </header>

      <section className="w-full h-full flex flex-col gap-4 justify-center to-white pl-16 ACform moblet:p-0 moblet:w-[70%] mobile:w-[90%] mobile-lg:min-w-[370px] mobile-sm:min-w-[300px] ">
        <h1 className="text-5xl">
          <h1 className="text-purple-550 ">Inscreva-se agora</h1> na Newsletter
        </h1>
        <p className=" w-[500px] moblet:text-xl moblet:w-[70%] tablet:min-w-[370px] mobile:w-[90%] mobile-lg:min-w-[370px] mobile-sm:min-w-[300px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
          aliquclassName est expedita mollitia, aut veritatis magnam natus
          blanditiis iste dolor libero harum obcaecati possimus rerum, aperiam
          ratione. Sequi, illum doloremque!
        </p>

        <div className="moblet:w-full w-[330px] flex flex-col gap-4">
          <input className="signupInp" type="text" placeholder="Nome" />
          <input className="signupInp" type="email" placeholder="E-Mail" />
          <button className="w-36 moblet:w-full h-11 rounded-lg bg-purple-550  text-lg cursor-pointer transition">
            Cadastrar
          </button>
          <p className="w-fit self-center cursor-pointer transition-all hover:text-purple-550 text-lg font-bold text-white moblet:flex hidden ml-1">
            ja tem uma conta?
          </p>
        </div>
      </section>
      <div className="w-full h-full flex justify-center items-center ACimg">
        <Image
          className="w-[85%] desktop:min-w-[500px] max-w-[700px]"
          alt="desenho de mulher meditando"
          src={Img}
        />
      </div>
    </div>
  );
}

export default CursoMeditacao;

import Img from "/public/_images/projectsItems/landingPages/acAlma/HomeImg.png";
import "./style.css";
import BackIcon from "@/components/projects/components/global/BackIcon";
import Image from "next/image";
import AcLinks from "./AcLinks";

function CursoMeditacao() {
  return (
    <div className="w-full desktop:h-full laptop:h-full bg-neutral-800 text-white body">
      <header className="w-full min-h-[80px] flex items-center justify-around tablet-sm:justify-center text-3xl header">
        <BackIcon className="top-5 w-16" />

        <p className="flex  mobile:block mobile:w-full text-center">
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

      <section className="w-full h-full flex flex-col gap-4 justify-center to-white pl-16 ACform moblet:p-0 tablet:w-[500px] tablet-sm:w-[90%] mobile:w-[90%] mobile:min-w-[300px] ">
        <h1 className="text-5xl mobile:text-4xl text-center">
          <h1 className="text-purple-550 ">Inscreva-se agora</h1> na Newsletter
        </h1>
        <p className="text-justify w-[500px] mobile:text-xl tablet-sm:text-xl tablet-sm:w-full  tablet:w-[500px] mobile:w-full">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
          aliquclassName est expedita mollitia, aut veritatis magnam natus
          blanditiis iste dolor libero harum obcaecati possimus rerum, aperiam
          ratione. Sequi, illum doloremque!
        </p>

        <div className="mobile:w-full tablet:w-[400px] w-[330px] flex flex-col gap-4">
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

import "./styles.css";
import BackIcon from "../../components/BackIcon";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import logo from "/_images/projectsItems/landingPages/mhsBS/MHSlogo.png";
import { useEffect, useState } from "react";
function MHSBarberShop() {
  const servicos = [
    {
      title: "cabelo",
      items: [
        { name: "infantil", price: "R$ 20" },
        { name: "corte", price: "R$ 25" },
        { name: "escova", price: "R$ 30" },
        { name: "hidratação", price: "R$ 30" },
        { name: "coloração", price: "R$ 40" },
      ],
    },
    {
      title: "barba",
      items: [
        { name: "aparo", price: "R$ 20" },
        { name: "corte", price: "R$ 25" },
        { name: "hidratação", price: "R$ 30" },
        { name: "coloração", price: "R$ 40" },
      ],
    },
  ];

  // mostra o btn de voltar ao topo
  function showBtn() {
    const el = document.querySelector(".toTop").style;
    el.display = window.scrollY < 300 ? "" : "block";
  }

  document.addEventListener("scroll", () => {
    if (location.href.includes("MHS-barber-shop")) {
      showBtn();
    }
  });

  // mostra os links do header
  const [moreOpt, setMoreOpt] = useState(true);
  const handlerMoreOpt = () => {
    setMoreOpt(!moreOpt);

    for (let i = 1; i <= 3; i++) {
      const line = document.getElementById("BSline" + i);
      line.classList.toggle("on", moreOpt);
    }

    const wrapper = document.querySelector(".BSlinks");
    wrapper.style.width = moreOpt ? "100%" : "";
  };

  // scrolla o menu
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    document.querySelector(".BSbtnArrowLeft").style.display =
      scroll === 0 ? "none" : "block";

    document.querySelector(".BSbtnArrowRigth").style.display =
      scroll === servicos.length - 1 ? "none" : "block";
  }, [scroll]);

  function scrollMenu(direction) {
    const el = document.querySelector(".BScardsContainer");

    const toScroll = (el.scrollWidth + 10) / servicos.length;
    el.scrollBy(direction === "left" ? -toScroll : toScroll, 0);
    setScroll((old) => (direction === "left" ? old - 1 : old + 1));
  }
  function getFavicon() {
    return document.getElementById("favicon");
  }
  useEffect(() => {
    const icon = getFavicon();
    icon.href =
      "/_images/projectsItems/landingPages/mhsBS/mhsBS_favicon.ico";
  }, []);

  return (
    <div className="BSbody">
      {/* ==================== header ==================== */}
      <a href="#BShome" className="toTop">
        <div className="BSarrow"></div>
      </a>
      <header className="BSheader">
        <BackIcon
          styles={{
            top: "30px",
            width: "50px",
          }}
        />
          <img className="BSlogo" src={logo} />

        <div className="BSlinksContainer">
          <div onClick={handlerMoreOpt} className="BSlinks">
            <a className="BSlink" href="#BSmenu">
              menu
            </a>
            <a className="BSlink" href="#BShours">
              horarios
            </a>
            <a className="BSlink" href="#BSaddress">
              endereço
            </a>
            <a className="BSlink" href="#BScontact">
              contato
            </a>
          </div>

          <div onClick={handlerMoreOpt} className="BSmoreOpt">
            <div className="BSline" id="BSline1"></div>
            <div className="BSline" id="BSline2"></div>
            <div className="BSline" id="BSline3"></div>
          </div>
        </div>
      </header>

      {/* ==================== home ==================== */}
      <div id="BShome" className="home">
        <div className="homeTitleContainer">
          <h1 className="homeTitle">MHS</h1>
          <h1 className="homeTitle">Barber Shop</h1>
        </div>
        <div className="CTA">Fazer Reserva</div>
      </div>

      {/* ==================== menu ==================== */}

      <div id="BSmenu" className="menu">
        <p className="menuTitle">serviços</p>

        <div className="BScardsContainer">
          {servicos.map((i) => (
            <div key={i.title} className="menuCard">
              <h1 className="BScardTitle">{i.title}</h1>

              <table className="BScardItems">
                <tbody className="BStbody">
                  {i.items.map((t) => (
                    <tr className="BSitem" key={t.name}>
                      <td className="BSitemName">{t.name}</td>

                      <td className="itemDiv">•</td>

                      <td>{t.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* ====== setas pro scroll do mobile ====== */}
        </div>
        <div onClick={scrollMenu} className="BSbtnArrowRigth"></div>
        <div
          onClick={() => scrollMenu("left")}
          className="BSbtnArrowLeft"
        ></div>
      </div>

      {/* ================== horarios ================== */}

      <div id="BShours" className="hours">
        <p>segunda - sexta</p>
        <p>10:00 - 20:00</p>
        <hr className="hoursLine" />
        <p>sábados</p>
        <p>10:00 - 22:00</p>

        <div id="BShourDetail1"></div>
        <div id="BShourDetail2"></div>
      </div>

      {/* ================== localização ================== */}

      <div id="BSaddress" className="address">
        <p className="mapTitle"> endereço</p>
        <div className="addressCard">
          <h4>MHS barber shop</h4>
          <br />
          <p>R. Martinópolis,</p>
          <p>844 - Muribeca dos Guararapes,</p>
          <p>Jaboatão dos Guararapes - PE, 54320-042</p>
        </div>
        <iframe
          className="BSmap"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463.1840754716972!2d-34.933242527819694!3d-8.160951006872551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae15481497225%3A0x54f2f4c73b3f7379!2sMHS%20barber%20shop!5e0!3m2!1spt-BR!2sbr!4v1687784096271!5m2!1spt-BR!2sbr"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* ================== contato ================== */}
        <div id="BScontact" className="contact">
          <p className="contactTitle">contato</p>

          <div className="BScontactLinks">
            <div className="BScontactLink">
              <WhatsAppIcon sx={{ fontSize: "40px" }} />
              <p>(81) 99999-9999</p>
            </div>

            <div className="BScontactLink">
              <InstagramIcon sx={{ fontSize: "40px" }} />
              <a
                href="https://www.instagram.com/mhs_barbershop/"
                target="_blank"
              >
                @mhs_barbershop
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className="BSfooter">
        <p>MHS Barber Shop - Copyright &copy;</p>
        design and code by Marcus Xavier
      </footer>
    </div>
  );
}

export default MHSBarberShop;

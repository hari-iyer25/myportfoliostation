import { useEffect, useRef, useState } from "react";
import "./ps4ui.css";

export default function PS4UI() {
  const [clock, setClock] = useState("");
  const [infoIndex, setInfoIndex] = useState(0);
  const infoMessages = [
    "Welcome to my personal website!",
    "Explore my projects and side hustles 🚀",
    "Check out UMacro — AI for food tracking",
  ];
  const xRef = useRef<number | null>(null);
  const yRef = useRef<number | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setInfoIndex((prev) => (prev + 1) % infoMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (xRef.current !== null && yRef.current !== null) {
        window.scrollBy(e.clientX - xRef.current, e.clientY - yRef.current);
      }
      xRef.current = e.clientX;
      yRef.current = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const tiles = [
    {
      id: "linkedin",
      title: "LinkedIn",
      className: "linkedin",
      link: "https://www.linkedin.com/in/hari-iyer-b900542a3/",
    },
    {
      id: "umacro",
      title: "UMacro.tech",
      className: "new",
      link: "https://www.umacro.tech/",
    },
    {
      id: "win",
      title: "UMacro Startup Win",
      className: "overwatch",
      link: "https://www.umass.edu/innovation/news/2025-startup-competition-results", // change this to exact link if available
    },
    {
      id: "rocketLeague",
      title: "Rocket League",
      className: "rocketLeague",
    },
    {
      id: "cod",
      title: "Call Of Duty: Black Ops III",
      className: "cod",
    },
    {
      id: "furi",
      title: "Furi",
      className: "furi",
    },
    {
      id: "youtube",
      title: "YouTube",
      className: "youtube",
    },
    {
      id: "bro",
      title: "BroForce",
      className: "bro",
    },
    {
      id: "outlast",
      title: "Outlast 2",
      className: "outlast",
    },
  ];

  return (
    <div>
      <header>
        <div id="plus"></div>
        <div id="info"></div>
        <div id="textInfo" className="animated slideInDown">
          {infoMessages[infoIndex]}
        </div>
        <div id="friends"></div>
        <div id="user"></div>
        <div id="userName">Pixmy Sky</div>
        <div id="trophies"></div>
        <div id="clock">{clock}</div>
      </header>

      <div id="games">
        {tiles.map((game) => {
          const content = (
            <>
              <div className={`imgGame ${game.className}`}></div>
              <div className="gameText">Start</div>
              <span className="gameTitle">{game.title}</span>
            </>
          );

          return (
            <div
              className="squareGame animated bounceInLeft"
              key={game.id}
              onMouseEnter={(e) => {
                e.currentTarget
                  .querySelector(".gameText")
                  ?.classList.add("show");
                e.currentTarget
                  .querySelector(".gameTitle")
                  ?.classList.add("show");
              }}
              onMouseLeave={(e) => {
                e.currentTarget
                  .querySelector(".gameText")
                  ?.classList.remove("show");
                e.currentTarget
                  .querySelector(".gameTitle")
                  ?.classList.remove("show");
              }}
              onClick={() => {
                if (game.link) window.open(game.link, "_blank");
              }}
            >
              {content}
            </div>
          );
        })}
      </div>

      <div className="box">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
    </div>
  );
}

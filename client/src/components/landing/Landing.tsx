import { useEffect, useState } from "react";
import "./landing.css";

type Background = {
  brand_picture_id: number;
  url: string;
  brand_id: number;
};

export default function Landing() {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const FRONT_ORDER = [6, 9, 1, 8]; 

  useEffect(() => {
    fetch("http://localhost:3310/api/landing")
      .then((res) => res.json())
      .then((data: Background[]) => {
        const ordered = data.sort(
          (a, b) => FRONT_ORDER.indexOf(a.brand_id) - FRONT_ORDER.indexOf(b.brand_id)
        );
        setBackgrounds(ordered);
      });
  }, []);

  return (
    <div className="landing-wrapper">
      {backgrounds.map((bg) => {
        if (bg.url.endsWith(".mp4")) {
          return (
            <div className="landing-section" key={bg.brand_picture_id}>
              <video
                src={`http://localhost:3310${bg.url}`}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          );
        }

        return (
          <div
            className="landing-section"
            key={bg.brand_picture_id}
            style={{ backgroundImage: `url(http://localhost:3310${bg.url})` }}
          />
        );
      })}
    </div>
  );
}

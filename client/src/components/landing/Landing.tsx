import { useEffect, useState, useRef, JSX } from "react";
import CollectionLp from "../collectionLp/CollectionLp";
import Footer from "../Footer/Footer";
import "./landing.css";

type Background = {
  brand_picture_id: number;
  url: string;
  brand_id: number;
};

type Section =
  | { type: "media"; bg: Background }
  | { type: "component"; element: JSX.Element };

export default function Landing() {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);

  const FRONT_ORDER = [6, 9, 1, 8];

  useEffect(() => {
    fetch("http://localhost:3310/api/landing")
      .then((res) => res.json())
      .then((data: Background[]) => {
        const ordered = data.sort(
          (a, b) =>
            FRONT_ORDER.indexOf(a.brand_id) -
            FRONT_ORDER.indexOf(b.brand_id)
        );
        setBackgrounds(ordered);
      });
  }, []);

  useEffect(() => {
    if (!backgrounds.length) return;

    const sectionElements =
      document.querySelectorAll<HTMLElement>(".landing-section");
    const vh = window.innerHeight;

    sectionElements.forEach((section, index) => {
      section.style.transform = `translateY(${index * vh}px)`;
    });

    const animateToIndex = (target: number) => {
      if (target < 0 || target >= sectionElements.length) return;
      if (isAnimating.current) return;

      isAnimating.current = true;
      const startIndex = currentIndex.current;
      const direction = target > startIndex ? 1 : -1;
      const duration = 900;
      const startTime = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = ease(progress);

        sectionElements.forEach((section, index) => {
          const offset = (index - startIndex - direction * eased) * vh;
          section.style.transform = `translateY(${offset}px)`;
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          currentIndex.current = target;
          sectionElements.forEach((section, index) => {
            section.style.transform = `translateY(${(index - target) * vh}px)`;
          });
          isAnimating.current = false;
        }
      };

      requestAnimationFrame(animate);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      if (e.deltaY > 0) {
        animateToIndex(currentIndex.current + 1);
      } else {
        animateToIndex(currentIndex.current - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [backgrounds]);

  const sections: Section[] = [];
  backgrounds.forEach((bg, index) => {
    sections.push({ type: "media", bg });

    if (index === 1) {
      sections.push({ type: "component", element: <CollectionLp /> });
    }
  });

  sections.push({ type: "component", element: <Footer /> });

  return (
    <div className="landing-wrapper">
      {sections.map((section, index) => {
        const zIndex = sections.length - index;

        if (section.type === "media") {
          const bg = section.bg;
          return (
            <div
              className="landing-section"
              style={{
                zIndex,
                backgroundImage: bg.url.endsWith(".mp4")
                  ? undefined
                  : `url(http://localhost:3310${bg.url})`,
              }}
              key={`media-${bg.brand_picture_id}`}
            >
              {bg.url.endsWith(".mp4") ? (
                <video
                  src={`http://localhost:3310${bg.url}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div className="discover-btn">Découvrir</div>
              )}
            </div>
          );
        }

        return (
          <div
            className={`landing-section ${
              section.element.type === Footer
                ? "footer-section"
                : "collection-lp-wrapper"
            }`}
            style={{ zIndex }}
            key={`component-${index}`}
          >
            {section.element}
          </div>
        );
      })}
    </div>
  );
}


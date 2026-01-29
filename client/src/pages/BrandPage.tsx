import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./BrandPage.css";
import BookmarkCard from "../components/BookmarkCard/BookmarkCard";
import BrandDescription from "../components/brandDescription/BrandDescription";
import BrandHero from "../components/brandHero/BrandHero";

export default function BrandPage() {
  const { id } = useParams();
  const brandId = Number(id);

  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("brand-no-scroll");
    window.scrollTo(0, 0);

    const sections = document.querySelectorAll<HTMLElement>(
      ".brand-snap-section",
    );
    const vh = window.innerHeight;

    sections.forEach((section, index) => {
      section.style.transform = `translateY(${index * vh}px)`;
    });

    const animateToIndex = (target: number) => {
      if (target < 0 || target >= sections.length) return;
      if (isAnimating.current) return;

      isAnimating.current = true;
      const startIndex = currentIndex.current;
      const direction = target > startIndex ? 1 : -1;
      const duration = 800;
      const startTime = performance.now();
      const ease = (t: number) => 1 - (1 - t) ** 3;

      // Si on quitte la section contenu, cacher le contenu
      if (startIndex === 1 && target === 0) {
        setContentVisible(false);
      }

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = ease(progress);

        sections.forEach((section, index) => {
          const offset = (index - startIndex - direction * eased) * vh;
          section.style.transform = `translateY(${offset}px)`;
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          currentIndex.current = target;
          sections.forEach((section, index) => {
            section.style.transform = `translateY(${(index - target) * vh}px)`;
          });
          isAnimating.current = false;

          // Si on arrive sur la section contenu, déclencher l'animation
          if (target === 1) {
            setContentVisible(true);
          }
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
      document.body.classList.remove("brand-no-scroll");
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="brand-page-wrapper">
      <section className="brand-snap-section">
        <BrandHero brandId={brandId} />
      </section>
      <section className="brand-snap-section content-section">
        <BrandDescription brandId={brandId} isVisible={contentVisible} />
        <BookmarkCard brandId={brandId} isVisible={contentVisible} />
      </section>
    </div>
  );
}

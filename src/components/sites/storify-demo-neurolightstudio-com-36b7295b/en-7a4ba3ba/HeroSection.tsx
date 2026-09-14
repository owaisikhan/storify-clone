"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { categories, heroPromos, heroSlides } from "@/data/site";
import { cn } from "@/lib/utils";

import {
  SlideArt,
  SlideButton,
  SlideContent,
  SlideHeading,
  slideTextStyle,
  type SlideVars,
} from "./Slide";

/**
 * Hero mosaic: category rail (lg+) | slider | two stacked promo tiles.
 * Grid: .hs-grid--leftCategoryBar3, container height lg:h-[60svh].
 *
 * INTERACTION MODEL: the slider is time-driven (auto-advance) with
 * click-to-select dots at bottom-right; slides cross-translate the track.
 */

const slideArtVars: SlideVars[] = [
  {
    "--sl-art-jc-l": "center",
    "--sl-art-ai-l": "center",
    "--sl-art-w-l": "76%",
    "--sl-art-t-l": "translate(1.3222377800407334%, 49.54356997381437%) rotate(0deg)",
    "--sl-art-jc-s": "center",
    "--sl-art-ai-s": "center",
    "--sl-art-w-s": "100%",
    "--sl-art-t-s": "translate(1.5970203488372092%, 45.039970930232556%) rotate(0deg)",
    "--sl-art-jc-p": "center",
    "--sl-art-ai-p": "center",
    "--sl-art-w-p": "76%",
    "--sl-art-t-p": "translate(1.3222377800407334%, 49.54356997381437%) rotate(0deg)",
  },
  {
    "--sl-art-jc-l": "center",
    "--sl-art-ai-l": "center",
    "--sl-art-w-l": "67%",
    "--sl-art-t-l": "translate(-0.18855015274949105%, 41.58604887983707%) rotate(0deg)",
    "--sl-art-jc-s": "center",
    "--sl-art-ai-s": "center",
    "--sl-art-w-s": "81%",
    "--sl-art-t-s": "translate(0.5636300798086484%, 43.284813414720794%) rotate(0deg)",
    "--sl-art-jc-p": "center",
    "--sl-art-ai-p": "center",
    "--sl-art-w-p": "100%",
    "--sl-art-t-p": "translate(1.4223744340273683%, 33.563240715385845%) rotate(0deg)",
  },
];

const slideContentVars: SlideVars[] = [
  {
    "--sl-jc-l": "center",
    "--sl-ai-l": "flex-start",
    "--sl-ta-l": "center",
    "--sl-gap-l": "1.2208cqw",
    "--sl-scale-l": "1.54",
    "--sl-jc-s": "center",
    "--sl-ai-s": "flex-start",
    "--sl-ta-s": "center",
    "--sl-gap-s": "2.7907cqw",
    "--sl-scale-s": "0.75",
    "--sl-jc-p": "center",
    "--sl-ai-p": "flex-start",
    "--sl-ta-p": "center",
    "--sl-gap-p": "4.9587cqw",
    "--sl-scale-p": "1.54",
  },
  {
    "--sl-jc-l": "center",
    "--sl-ai-l": "flex-start",
    "--sl-ta-l": "center",
    "--sl-gap-l": "1.2208cqw",
    "--sl-scale-l": "1.41",
    "--sl-jc-s": "center",
    "--sl-ai-s": "flex-start",
    "--sl-ta-s": "center",
    "--sl-gap-s": "1.1628cqw",
    "--sl-scale-s": "1.05",
    "--sl-jc-p": "center",
    "--sl-ai-p": "flex-start",
    "--sl-ta-p": "center",
    "--sl-gap-p": "0cqw",
    "--sl-scale-p": "0.93",
  },
];

const slideHeadingVars: SlideVars[] = [
  {
    "--fs-l": "3.6623cqw",
    "--wt-l": "300",
    "--it-l": "normal",
    "--co-l": "#1f2937",
    "--wd-l": "75%",
    "--fs-s": "8.3721cqw",
    "--wt-s": "300",
    "--it-s": "normal",
    "--co-s": "#1f2937",
    "--wd-s": "100%",
    "--fs-p": "14.876cqw",
    "--wt-p": "300",
    "--it-p": "normal",
    "--co-p": "#1f2937",
    "--wd-p": "75%",
  },
  {
    "--fs-l": "4.0692cqw",
    "--wt-l": "700",
    "--it-l": "normal",
    "--co-l": "#1f2937",
    "--wd-l": "50%",
    "--fs-s": "6.2791cqw",
    "--wt-s": "700",
    "--it-s": "normal",
    "--co-s": "#1f2937",
    "--wd-s": "97%",
    "--fs-p": "16.5289cqw",
    "--wt-p": "700",
    "--it-p": "normal",
    "--co-p": "#1f2937",
    "--wd-p": "100%",
  },
];

const slideSubtitleVars: SlideVars = {
  "--fs-l": "1.6277cqw",
  "--wt-l": "400",
  "--it-l": "normal",
  "--co-l": "#1f2937",
  "--wd-l": "45%",
  "--fs-s": "3.7209cqw",
  "--wt-s": "400",
  "--it-s": "normal",
  "--co-s": "#1f2937",
  "--wd-s": "100%",
  "--fs-p": "6.6116cqw",
  "--wt-p": "400",
  "--it-p": "normal",
  "--co-p": "#1f2937",
  "--wd-p": "100%",
};

const slideButtonVars: SlideVars[] = [
  {
    "--fs-l": "1.4242cqw",
    "--wt-l": "500",
    "--it-l": "normal",
    "--co-l": "#ffffff",
    "--wd-l": "auto",
    "--fs-s": "3.2558cqw",
    "--wt-s": "500",
    "--it-s": "normal",
    "--co-s": "#ffffff",
    "--wd-s": "auto",
    "--fs-p": "5.7851cqw",
    "--wt-p": "500",
    "--it-p": "normal",
    "--co-p": "#ffffff",
    "--wd-p": "auto",
  },
  {
    "--fs-l": "1.4242cqw",
    "--wt-l": "500",
    "--it-l": "normal",
    "--co-l": "#1f2937",
    "--wd-l": "auto",
    "--fs-s": "2.5581cqw",
    "--wt-s": "500",
    "--it-s": "normal",
    "--co-s": "#1f2937",
    "--wd-s": "auto",
    "--fs-p": "5.7851cqw",
    "--wt-p": "500",
    "--it-p": "normal",
    "--co-p": "#1f2937",
    "--wd-p": "auto",
  },
];

const promoArtVars: SlideVars[] = [
  {
    "--sl-art-jc-l": "flex-end",
    "--sl-art-ai-l": "center",
    "--sl-art-w-l": "96%",
    "--sl-art-t-l": "translate(16.742776221995932%, 25.356415478615073%) rotate(-36deg)",
    "--sl-art-jc-s": "flex-end",
    "--sl-art-ai-s": "center",
    "--sl-art-w-s": "100%",
    "--sl-art-t-s": "translate(23.30016977099418%, 27.275186644484446%) rotate(-36deg)",
    "--sl-art-jc-p": "center",
    "--sl-art-ai-p": "center",
    "--sl-art-w-p": "100%",
    "--sl-art-t-p": "translate(-1.028297579572802%, 39.37026219906305%) rotate(0deg)",
  },
  {
    "--sl-art-jc-l": "flex-end",
    "--sl-art-ai-l": "center",
    "--sl-art-w-l": "50%",
    "--sl-art-t-l": "translate(3.41697428716904%, 5.688100087285424%) rotate(0deg)",
    "--sl-art-jc-s": "flex-end",
    "--sl-art-ai-s": "center",
    "--sl-art-w-s": "100%",
    "--sl-art-t-s": "translate(17.865303663619567%, 28.919839714529303%) rotate(0deg)",
    "--sl-art-jc-p": "flex-end",
    "--sl-art-ai-p": "center",
    "--sl-art-w-p": "100%",
    "--sl-art-t-p": "translate(3.41697428716904%, 5.688100087285424%) rotate(0deg)",
  },
];

const promoContentVars: SlideVars[] = [
  {
    "--sl-jc-l": "flex-start",
    "--sl-ai-l": "flex-start",
    "--sl-ta-l": "left",
    "--sl-gap-l": "1.2208cqw",
    "--sl-scale-l": "1.92",
    "--sl-jc-s": "flex-start",
    "--sl-ai-s": "flex-start",
    "--sl-ta-s": "left",
    "--sl-gap-s": "2.7907cqw",
    "--sl-scale-s": "1.02",
    "--sl-jc-p": "center",
    "--sl-ai-p": "flex-start",
    "--sl-ta-p": "center",
    "--sl-gap-p": "4.9587cqw",
    "--sl-scale-p": "0.82",
  },
  {
    "--sl-jc-l": "flex-start",
    "--sl-ai-l": "flex-start",
    "--sl-ta-l": "left",
    "--sl-gap-l": "1.2208cqw",
    "--sl-scale-l": "1.38",
    "--sl-jc-s": "flex-start",
    "--sl-ai-s": "flex-start",
    "--sl-ta-s": "left",
    "--sl-gap-s": "2.7907cqw",
    "--sl-scale-s": "1.04",
    "--sl-jc-p": "flex-start",
    "--sl-ai-p": "flex-start",
    "--sl-ta-p": "left",
    "--sl-gap-p": "4.9587cqw",
    "--sl-scale-p": "1.38",
  },
];

const promoHeadingVars: SlideVars[] = [
  {
    "--fs-l": "4.4761cqw",
    "--wt-l": "700",
    "--it-l": "normal",
    "--co-l": "#1f2937",
    "--wd-l": "50%",
    "--fs-s": "9.0698cqw",
    "--wt-s": "700",
    "--it-s": "normal",
    "--co-s": "#1f2937",
    "--wd-s": "83%",
    "--fs-p": "18.1818cqw",
    "--wt-p": "700",
    "--it-p": "normal",
    "--co-p": "#1f2937",
    "--wd-p": "100%",
  },
  {
    "--fs-l": "3.9674cqw",
    "--wt-l": "700",
    "--it-l": "normal",
    "--co-l": "#1f2937",
    "--wd-l": "100%",
    "--fs-s": "9.0698cqw",
    "--wt-s": "700",
    "--it-s": "normal",
    "--co-s": "#1f2937",
    "--wd-s": "100%",
    "--fs-p": "16.1157cqw",
    "--wt-p": "700",
    "--it-p": "normal",
    "--co-p": "#1f2937",
    "--wd-p": "100%",
  },
];

const promoButtonVars: SlideVars[] = [
  {
    "--fs-l": "2.0346cqw",
    "--wt-l": "500",
    "--it-l": "normal",
    "--co-l": "#1f2937",
    "--wd-l": "auto",
    "--fs-s": "4.6512cqw",
    "--wt-s": "500",
    "--it-s": "normal",
    "--co-s": "#1f2937",
    "--wd-s": "auto",
    "--fs-p": "8.2645cqw",
    "--wt-p": "500",
    "--it-p": "normal",
    "--co-p": "#1f2937",
    "--wd-p": "auto",
  },
  {
    "--fs-l": "2.0346cqw",
    "--wt-l": "500",
    "--it-l": "normal",
    "--co-l": "#1f2937",
    "--wd-l": "auto",
    "--fs-s": "4.6512cqw",
    "--wt-s": "500",
    "--it-s": "normal",
    "--co-s": "#1f2937",
    "--wd-s": "auto",
    "--fs-p": "8.2645cqw",
    "--wt-p": "500",
    "--it-p": "normal",
    "--co-p": "#1f2937",
    "--wd-p": "auto",
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % heroSlides.length),
      6000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="py-4 lg:py-6">
      <div className="container mx-auto px-4">
        {/* mobile category strip, mirrors the live markup above the mosaic */}
        <nav
          data-hero-category-chips="true"
          aria-label="All Categories"
          className="mb-3 flex snap-x gap-2 overflow-x-auto pb-1 no-scrollbar [mask-image:linear-gradient(to_right,#000_86%,transparent)] [scroll-padding-inline:0.5rem] lg:hidden"
        >
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="flex h-10 shrink-0 snap-start items-center gap-2 rounded-button border border-border bg-background pe-3.5 ps-2.5 text-[13px] font-semibold text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center">
                <Image
                  src={category.image}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-sm object-contain"
                />
              </span>
              <span className="whitespace-nowrap">{category.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hs-grid gap-3 lg:h-[60svh] lg:gap-3.5 hs-grid--leftCategoryBar3">
          <div data-hs-area="cat" className="hidden lg:block">
            <nav
              aria-label="All Categories"
              className="flex h-full flex-col overflow-hidden rounded-xl border-solid border-[#e7e2ff] bg-[#f2f2f2] text-[#474747] [border-width:0.5px] dark:border-border dark:bg-muted dark:text-foreground"
            >
              <ul className="flex min-h-0 flex-1 flex-col justify-center gap-2 overflow-y-auto py-[26px] pe-[30px] ps-[29px]">
                {categories.map((category) => (
                  <li
                    key={category.href}
                    className="flex max-h-[72px] min-h-[26px] flex-1 items-center"
                  >
                    <Link
                      href={category.href}
                      className="flex h-full w-full items-center gap-2 text-[15px] font-bold transition-opacity hover:opacity-70"
                    >
                      <span className="grid h-[26px] w-[27px] shrink-0 place-items-center">
                        <Image
                          src={category.image}
                          alt=""
                          width={22}
                          height={22}
                          className="h-[22px] w-[22px] rounded-sm object-contain"
                        />
                      </span>
                      <span className="truncate">{category.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div data-hs-area="a" className="relative overflow-hidden rounded-xl">
            <div className="sl-frame relative h-full w-full overflow-hidden rounded-xl bg-muted">
              <div className="h-full overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
                >
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.title}
                      className="relative h-full min-w-0 flex-[0_0_100%]"
                    >
                      <div
                        className="absolute inset-0"
                        aria-hidden="true"
                        style={{ background: slide.background }}
                      />
                      <SlideArt
                        src={slide.image}
                        alt=""
                        vars={slideArtVars[index]}
                        sizes="(max-width: 640px) 90vw, 55vw"
                      />
                      <SlideContent vars={slideContentVars[index]}>
                        <SlideHeading vars={slideHeadingVars[index]}>
                          {slide.title}
                        </SlideHeading>
                        {slide.subtitle ? (
                          <p className="sl-text" style={{ ...slideSubtitleVars, ...slideTextStyle }}>
                            {slide.subtitle}
                          </p>
                        ) : null}
                        <Link href={slide.href}>
                          <SlideButton
                            vars={slideButtonVars[index]}
                            variant={index === 0 ? "solid" : "outline"}
                          >
                            {slide.cta}
                          </SlideButton>
                        </Link>
                      </SlideContent>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-2 right-3 flex items-center gap-1.5 sm:bottom-4 sm:right-4">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === active}
                    onClick={() => setActive(index)}
                    className={cn(
                      "relative h-1.5 rounded-full transition-all duration-300 before:absolute before:-inset-x-1 before:-inset-y-4 before:content-[''] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      index === active
                        ? "w-6 bg-foreground"
                        : "w-1.5 bg-foreground/30 hover:bg-foreground/50",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {heroPromos.map((promo, index) => (
            <div
              key={promo.title}
              data-hs-area={index === 0 ? "b" : "c"}
              className="relative overflow-hidden rounded-xl"
            >
              <div className="sl-frame relative h-full w-full overflow-hidden rounded-xl bg-muted">
                <div className="h-full overflow-hidden">
                  <div className="flex h-full">
                    <div className="relative h-full min-w-0 flex-[0_0_100%]">
                      <div
                        className="absolute inset-0"
                        aria-hidden="true"
                        style={{ background: promo.background }}
                      />
                      <SlideArt
                        src={promo.image}
                        alt=""
                        vars={promoArtVars[index]}
                      />
                      <SlideContent vars={promoContentVars[index]}>
                        <SlideHeading vars={promoHeadingVars[index]}>
                          {promo.title}
                        </SlideHeading>
                        <Link href={promo.href}>
                          <SlideButton
                            vars={promoButtonVars[index]}
                            variant="outline"
                          >
                            {promo.cta}
                          </SlideButton>
                        </Link>
                      </SlideContent>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

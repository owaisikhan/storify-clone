import Link from "next/link";

import { wideBanner } from "@/data/site";

import {
  SlideArt,
  SlideButton,
  SlideContent,
  SlideHeading,
  slideTextStyle,
  type SlideVars,
} from "./Slide";

/** Full-width MacBook Pro banner — aspect 16/7 (sm 16/5), captured gradient. */

const artVars: SlideVars = {
  "--sl-art-jc-l": "flex-end",
  "--sl-art-ai-l": "center",
  "--sl-art-w-l": "52%",
  "--sl-art-t-l": "translate(-4%, 4%) rotate(0deg)",
  "--sl-art-jc-s": "flex-end",
  "--sl-art-ai-s": "center",
  "--sl-art-w-s": "60%",
  "--sl-art-t-s": "translate(-2%, 6%) rotate(0deg)",
  "--sl-art-jc-p": "center",
  "--sl-art-ai-p": "flex-end",
  "--sl-art-w-p": "100%",
  "--sl-art-t-p": "translate(0%, 8%) rotate(0deg)",
};

const contentVars: SlideVars = {
  "--sl-jc-l": "flex-start",
  "--sl-ai-l": "center",
  "--sl-ta-l": "left",
  "--sl-gap-l": "1.2208cqw",
  "--sl-scale-l": "1.38",
  "--sl-jc-s": "flex-start",
  "--sl-ai-s": "center",
  "--sl-ta-s": "left",
  "--sl-gap-s": "2.7907cqw",
  "--sl-scale-s": "1.04",
  "--sl-jc-p": "flex-start",
  "--sl-ai-p": "center",
  "--sl-ta-p": "left",
  "--sl-gap-p": "4.9587cqw",
  "--sl-scale-p": "1.38",
};

const headingVars: SlideVars = {
  "--fs-l": "3.2cqw",
  "--wt-l": "700",
  "--it-l": "normal",
  "--co-l": "#ffffff",
  "--wd-l": "50%",
  "--fs-s": "6.2791cqw",
  "--wt-s": "700",
  "--it-s": "normal",
  "--co-s": "#ffffff",
  "--wd-s": "80%",
  "--fs-p": "12cqw",
  "--wt-p": "700",
  "--it-p": "normal",
  "--co-p": "#ffffff",
  "--wd-p": "100%",
};

const bodyVars: SlideVars = {
  "--fs-l": "1.32cqw",
  "--wt-l": "400",
  "--it-l": "normal",
  "--co-l": "#c9ccd4",
  "--wd-l": "40%",
  "--fs-s": "3cqw",
  "--wt-s": "400",
  "--it-s": "normal",
  "--co-s": "#c9ccd4",
  "--wd-s": "70%",
  "--fs-p": "5.5cqw",
  "--wt-p": "400",
  "--it-p": "normal",
  "--co-p": "#c9ccd4",
  "--wd-p": "100%",
};

const buttonVars: SlideVars = {
  "--fs-l": "1.25cqw",
  "--wt-l": "500",
  "--it-l": "normal",
  "--co-l": "#1f2937",
  "--wd-l": "auto",
  "--fs-s": "3cqw",
  "--wt-s": "500",
  "--it-s": "normal",
  "--co-s": "#1f2937",
  "--wd-s": "auto",
  "--fs-p": "5.5cqw",
  "--wt-p": "500",
  "--it-p": "normal",
  "--co-p": "#1f2937",
  "--wd-p": "auto",
};

export function WideBanner() {
  return (
    <section className="py-5 lg:py-8">
      <div className="container mx-auto px-4">
        <div className="sl-frame relative aspect-[16/7] overflow-hidden rounded-xl bg-muted sm:aspect-[16/5]">
          <div className="h-full overflow-hidden">
            <div className="flex h-full">
              <div className="relative h-full min-w-0 flex-[0_0_100%]">
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{ background: wideBanner.background }}
                />
                <SlideArt
                  src={wideBanner.image}
                  alt=""
                  vars={artVars}
                  sizes="(max-width: 640px) 60vw, 45vw"
                />
                <SlideContent vars={contentVars}>
                  <SlideHeading vars={headingVars}>
                    {wideBanner.title}
                  </SlideHeading>
                  <p className="sl-text" style={{ ...bodyVars, ...slideTextStyle }}>
                    {wideBanner.body}
                  </p>
                  <Link href={wideBanner.href}>
                    <SlideButton vars={buttonVars} background="#ffffff">
                      {wideBanner.cta}
                    </SlideButton>
                  </Link>
                </SlideContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

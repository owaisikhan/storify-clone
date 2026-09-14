import Image from "next/image";
import Link from "next/link";

import { collectionRows, collectionsHeading } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

import { ProductCard } from "./ProductCard";
import { SlideArt, SlideButton, SlideContent, SlideHeading, type SlideVars } from "./Slide";

/**
 * "Top Collections" — three rows of promo tile + four product cards.
 * Row grid: lg:grid-cols-[minmax(0,3fr)_repeat(4,minmax(0,2fr))], gap 16px.
 */

const promoArt: SlideVars[] = [
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
    "--sl-art-ai-l": "flex-end",
    "--sl-art-w-l": "92%",
    "--sl-art-t-l": "translate(4%, 18%) rotate(0deg)",
    "--sl-art-jc-s": "flex-end",
    "--sl-art-ai-s": "flex-end",
    "--sl-art-w-s": "100%",
    "--sl-art-t-s": "translate(6%, 20%) rotate(0deg)",
    "--sl-art-jc-p": "center",
    "--sl-art-ai-p": "flex-end",
    "--sl-art-w-p": "100%",
    "--sl-art-t-p": "translate(0%, 16%) rotate(0deg)",
  },
  {
    "--sl-art-jc-l": "center",
    "--sl-art-ai-l": "flex-end",
    "--sl-art-w-l": "100%",
    "--sl-art-t-l": "translate(0%, 12%) rotate(0deg)",
    "--sl-art-jc-s": "center",
    "--sl-art-ai-s": "flex-end",
    "--sl-art-w-s": "100%",
    "--sl-art-t-s": "translate(0%, 14%) rotate(0deg)",
    "--sl-art-jc-p": "center",
    "--sl-art-ai-p": "flex-end",
    "--sl-art-w-p": "100%",
    "--sl-art-t-p": "translate(0%, 10%) rotate(0deg)",
  },
];

const promoContent: SlideVars = {
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
};

const headingVars = (color: string): SlideVars => ({
  "--fs-l": "4.4761cqw",
  "--wt-l": "700",
  "--it-l": "normal",
  "--co-l": color,
  "--wd-l": "70%",
  "--fs-s": "9.0698cqw",
  "--wt-s": "700",
  "--it-s": "normal",
  "--co-s": color,
  "--wd-s": "83%",
  "--fs-p": "18.1818cqw",
  "--wt-p": "700",
  "--it-p": "normal",
  "--co-p": color,
  "--wd-p": "100%",
});

const buttonVars = (color: string): SlideVars => ({
  "--fs-l": "2.0346cqw",
  "--wt-l": "500",
  "--it-l": "normal",
  "--co-l": color,
  "--wd-l": "auto",
  "--fs-s": "4.6512cqw",
  "--wt-s": "500",
  "--it-s": "normal",
  "--co-s": color,
  "--wd-s": "auto",
  "--fs-p": "8.2645cqw",
  "--wt-p": "500",
  "--it-p": "normal",
  "--co-p": color,
  "--wd-p": "auto",
});

export function CollectionRows() {
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  return (
    <>
      <section className="pt-6 lg:pt-10">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-[length:var(--sec-title,22px)] font-bold tracking-[-0.03em] sm:text-[length:var(--sec-title-lg,28px)]">
            <span className="text-foreground/35">Top</span>{" "}
            <span className="bg-gradient-to-r from-foreground to-foreground/35 bg-clip-text text-transparent">
              {collectionsHeading.replace("Top ", "")}
            </span>
          </h2>
        </div>
      </section>

      <section className="py-6 lg:py-10">
        <div className="container mx-auto space-y-10 px-4 lg:space-y-14">
          {collectionRows.map((row, rowIndex) => {
            const color = row.promo.textClassName ? "#ffffff" : "#1f2937";
            return (
              <div
                key={row.promo.title}
                className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_repeat(4,minmax(0,2fr))]"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <div
                    className={cn(
                      "sl-frame relative h-full w-full overflow-hidden rounded-xl bg-muted",
                      "max-lg:aspect-[16/9]",
                    )}
                  >
                    <div
                      className="absolute inset-0"
                      aria-hidden="true"
                      style={{ background: row.promo.background }}
                    />
                    {row.promo.title ? (
                      <SlideArt
                        src={row.promo.image}
                        alt=""
                        vars={promoArt[rowIndex]}
                        sizes="(max-width: 1024px) 90vw, 30vw"
                      />
                    ) : (
                      <Image
                        src={row.promo.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 90vw, 30vw"
                        className="object-cover"
                      />
                    )}
                    {row.promo.title ? (
                      <SlideContent vars={promoContent} reveal="sl-reveal-fade">
                        <SlideHeading vars={headingVars(color)}>
                          {row.promo.title}
                        </SlideHeading>
                        <Link href={row.promo.href}>
                          <SlideButton vars={buttonVars(color)} variant="outline">
                            {row.promo.cta}
                          </SlideButton>
                        </Link>
                      </SlideContent>
                    ) : (
                      <Link
                        href={row.promo.href}
                        aria-label="Laptops"
                        className="absolute inset-0"
                      />
                    )}
                  </div>
                </div>

                {row.slugs
                  .map((slug) => bySlug.get(slug))
                  .filter((product) => product !== undefined)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

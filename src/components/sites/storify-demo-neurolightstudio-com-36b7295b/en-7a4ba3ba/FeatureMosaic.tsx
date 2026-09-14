import Image from "next/image";
import Link from "next/link";

import { featureTiles } from "@/data/site";

/**
 * Editorial tile mosaic below the category rail.
 * Grid: .hs-grid--feature, container height lg:h-[52svh]; each tile is a
 * full-bleed image (aspect-ratio 16/7 when the grid collapses to one column).
 */
export function FeatureMosaic() {
  return (
    <section className="py-4 lg:py-6">
      <div className="container mx-auto px-4">
        <div className="hs-grid gap-3 lg:h-[52svh] lg:gap-3.5 hs-grid--feature">
          {featureTiles.map((tile) => (
            <div
              key={tile.area}
              data-hs-area={tile.area}
              className="relative overflow-hidden rounded-xl bg-muted"
            >
              <Link href={tile.href} className="block h-full w-full">
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

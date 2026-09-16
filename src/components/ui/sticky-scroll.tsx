"use client";

import { ReactLenis } from "lenis/react";
import Image from "next/image";
import { forwardRef } from "react";

type GalleryPhoto = {
  src: string;
  alt: string;
};

const leftPhotos: GalleryPhoto[] = [
  {
    src: "/img/home/photo_1.png",
    alt: "ClaimSafe partner dealership exterior with a lineup of Jeep vehicles",
  },
  {
    src: "/img/home/photo_7.png",
    alt: "Dealership service bay with technicians working on vehicles across multiple lifts",
  },
  // {
  //   src: "/img/home/photo_2.png",
  //   alt: "Technician inspecting a vehicle's brakes and suspension on a lift",
  // },
];

const stickyPhotos: GalleryPhoto[] = [
  {
    src: "/img/home/photo_3.png",
    alt: "Warranty advisor reviewing claim documentation and diagrams on dual monitors",
  },
  {
    src: "/img/home/photo_6.png",
    alt: "Stack of warranty claim paperwork ready for submission and review",
  },
   {
    src: "/img/home/photo_2.png",
    alt: "Technician inspecting a vehicle's brakes and suspension on a lift",
  },
];

const rightPhotos: GalleryPhoto[] = [
  // {
  //   src: "/img/home/photo_5.png",
  //   alt: "ClaimSafe advisor consulting with a dealership partner at a desk",
  // },
  {
    src: "/img/home/photo_4.png",
    alt: "Handshake between a dealership manager and technician confirming a completed repair",
  },
  {
    src: "/img/home/photo_8.png",
    alt: "City skyline at dusk representing ClaimSafe's dealership network across Canada",
  },
];

const allPhotos = [...leftPhotos, ...stickyPhotos, ...rightPhotos];

function GalleryColumn({ photos, sticky = false }: { photos: GalleryPhoto[]; sticky?: boolean }) {
  return (
    <div className={`grid gap-2 ${sticky ? "sticky top-24 h-fit self-start" : ""}`}>
      {photos.map((photo) => (
        <figure key={photo.src} className="relative h-80 w-full overflow-hidden rounded-xl sm:h-96">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure>
      ))}
    </div>
  );
}

const StickyPhotoGallery = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <ReactLenis root>
      <section ref={ref} className="overflow-hidden rounded-2xl bg-primary-dark p-2 sm:p-3">
        {/* Small screens: plain 2-up grid, no sticky effect */}
        <div className="grid grid-cols-2 gap-2 sm:hidden">
          {allPhotos.map((photo) => (
            <figure key={photo.src} className="relative aspect-square w-full overflow-hidden rounded-xl">
              <Image src={photo.src} alt={photo.alt} fill sizes="50vw" className="object-cover" />
            </figure>
          ))}
        </div>

        {/* sm and up: sticky 3-column layout */}
        <div className="hidden gap-2 sm:grid sm:grid-cols-3">
          <GalleryColumn photos={leftPhotos} />
          <GalleryColumn photos={stickyPhotos} sticky />
          <GalleryColumn photos={rightPhotos} />
        </div>
      </section>
    </ReactLenis>
  );
});

StickyPhotoGallery.displayName = "StickyPhotoGallery";

export default StickyPhotoGallery;

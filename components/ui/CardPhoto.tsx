import Image from "next/image";

type CardPhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  /** how much of the card, from its right edge, the photo covers (Tailwind width class) */
  widthClassName: string;
};

/**
 * The product photo on the right of a soft-pink card (Services, Industries). The photos have pure white backgrounds and
 * are multiplied onto the card, so the background takes the card's pink and only the whole product shows, standing on
 * the card like in the design, with no fade. The whole photo is shown with a small margin to the card's edges, so when it
 * zooms in a little on hover the product never gets cut (only the card itself clips).
 */
export const CardPhoto = ({ src, alt, sizes, widthClassName }: CardPhotoProps) => (
  <div className={`absolute inset-y-[3%] right-[2%] mix-blend-multiply ${widthClassName}`}>
    <Image
      src={src}
      alt={alt}
      fill
      quality={90}
      sizes={sizes}
      className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
    />
  </div>
);

/** The service cards' background, as measured on the design: light on the left (behind the text), deepening to the right */
export const serviceCardBackground =
  "bg-[linear-gradient(to_right,var(--color-service-card-from),var(--color-service-card-mid)_50%,var(--color-service-card-to))]";

/** The industry cards' background: an almost flat, very light pink */
export const industryCardBackground = "bg-[linear-gradient(to_right,var(--color-industry-card-from),var(--color-industry-card-to))]";

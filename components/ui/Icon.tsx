import type { IconType } from "react-icons";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import { LuPackageOpen, LuShieldCheck } from "react-icons/lu";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  TbArrowRight,
  TbCheck,
  TbChevronLeft,
  TbChevronRight,
  TbGift,
  TbLeaf,
  TbMail,
  TbMenu2,
  TbPackage,
  TbSettings,
  TbShoppingBag,
  TbStack2,
  TbUsers,
  TbX,
} from "react-icons/tb";

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  LuPackageOpen,
  LuShieldCheck,
  RiDoubleQuotesL,
  TbArrowRight,
  TbCheck,
  TbChevronLeft,
  TbChevronRight,
  TbGift,
  TbLeaf,
  TbMail,
  TbMenu2,
  TbPackage,
  TbSettings,
  TbShoppingBag,
  TbStack2,
  TbUsers,
  TbX,
};

type Props = {
  name: string;
  className?: string;
  // Line thickness of the outline icons (Tb, Lu); the filled icons (Fa, Ri) keep their own shape.
  strokeWidth?: number;
};

export const Icon = ({ name, className, strokeWidth }: Props) => {
  const Component = icons[name] ?? TbCheck;
  return <Component className={className} strokeWidth={name.startsWith("Tb") || name.startsWith("Lu") ? strokeWidth : undefined} aria-hidden="true" />;
};

'use client';

import { usePathname } from 'next/navigation';
import Header from "./Header";
import HeaderWhiteLogo from "./HeaderWhiteLogo";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isUnnatovPage = pathname === '/unnatov' || pathname === '/unnatov/';
  
  return isUnnatovPage ? <HeaderWhiteLogo /> : <Header />;
}
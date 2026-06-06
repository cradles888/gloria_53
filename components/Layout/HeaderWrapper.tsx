import { headers } from "next/headers";

import Header from "./Header";
import HeaderWhiteLogo from "./HeaderWhiteLogo";

export default async function HeaderWrapper() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isUnnatovPage = pathname === "/unnatov" || pathname === "/unnatov/";

  return isUnnatovPage ? <HeaderWhiteLogo /> : <Header />;
}

import { isAdminAuthenticated } from "@/lib/adminAuth";
import HeaderClient from "./HeaderClient";

const Header = async ({ variant = "default" }) => {
  const isAdmin = await isAdminAuthenticated();

  return <HeaderClient variant={variant} isAdminAuthenticated={isAdmin} />;
};

export default Header;

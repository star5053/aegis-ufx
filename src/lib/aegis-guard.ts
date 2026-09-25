import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { canAccessControlCenter } from "@/lib/permissions";

export async function requireAegisStaff() {
  const user = await getCurrentUser();
  if (!user) redirect("/aegis/login");
  if (!canAccessControlCenter(user.role)) redirect("/ufx");
  return user;
}

import { redirect } from "next/navigation";

/** Kept for old links — MVP first page is now `/`. */
export default function PlatformRedirectPage() {
  redirect("/");
}

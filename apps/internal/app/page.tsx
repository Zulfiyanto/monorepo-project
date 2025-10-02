import { redirect } from "next/navigation";
import { ROUTES } from "@repo/utils";

export default function Home() {
  redirect(ROUTES.INTERNAL.DASHBOARD);
}

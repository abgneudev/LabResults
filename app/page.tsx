import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to results page
  redirect("/results")
}

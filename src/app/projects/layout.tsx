import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "專案 Project",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
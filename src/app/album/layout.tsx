import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "相簿 Album ",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
import { site } from "@/libs/site";
import { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    description: site.description,
    keywords: site.keywords,
    title: {
        default: site.title,
        template: `%s | ${site.title}"`,
    },
    icons: {
        icon: [
            {
                url: "/images/icons/favicon.ico",
                type: "image/x-icon",
                rel: "icon",
            },
        ],
    }
}
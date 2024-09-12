import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/lib/Providers";
import GlobalDialog from "@/components/global/GlobalDialog";
import azurawatchogo from "@/public/azurawatch-logo.svg"

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AzuraWatch",
  icons: {
    icon: azurawatchogo.src
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="max-w-full w-dvw bg-darkBg text-[#f6f4f4]">
          <div className="max-w-[1440px] mx-auto">
            <GlobalDialog />
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}

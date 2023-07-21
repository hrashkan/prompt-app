import "@/styles/globals.css";

import Nav from "@/components/Nav";

export const metadata = {
  title: "Prompt Application",
  description: "Discover && Share AI prompt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <div className="main">
            <div className="gradinet" />
          </div>
          <div className="app">
            <Nav />
            {children}
          </div>
      </body>
    </html>
  );
}

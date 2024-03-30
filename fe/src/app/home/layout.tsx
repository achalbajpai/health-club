import "../globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}

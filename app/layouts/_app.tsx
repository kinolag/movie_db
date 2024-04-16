import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

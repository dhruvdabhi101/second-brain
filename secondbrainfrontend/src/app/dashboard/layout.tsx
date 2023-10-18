import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/component/common/Header";
import Footer from "@/component/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Threecranes Gallery",
  description: "Ecommerce Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Header/>
        {children}
      
      <Footer />
      
        <ToastContainer autoClose={3000} position="top-right" />
        </StoreProvider>
      
        
        </body>
    </html>
  );
}

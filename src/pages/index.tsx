import Image from "next/image";
import { Inter } from "next/font/google";
import Signin from "@/components/signin";
import SignUp from "@/components/signup";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <SignUp />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo (2).png";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="shadow-md">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Flow Jobs logo" width={50} height={50} />
          <span className="text-xl font-bold tracking-tight">Flow Jobs</span>
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a Job</Link>
        </Button>
      </nav>
    </header>
  );
};
export default Navbar;

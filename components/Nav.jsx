import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
function Nav() {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptApp</p>
      </Link>

      {/* Navigation */}
      <Navigation />
    </nav>
  );
}

export default Nav;

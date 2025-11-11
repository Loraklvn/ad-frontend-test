import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#404040] h-[172.5px] flex items-center justify-center">
      <Link href="/" className="text-2xl font-bold text-[#585660]">
        <Image src="/logo.svg" alt="logo" width={170} height={44} />
      </Link>
    </footer>
  );
}

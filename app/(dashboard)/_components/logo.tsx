import React from 'react';
import Image from "next/image"
import Link from "next/link";

const Logo = () => {
    return (

            <Link href="/" className="flex gap-2 cursor-pointer">
                <Image src="image/logo.svg" alt="logo" width={30} height={30} />
                <p className={"font-bold text-xl text-[#0369a1]"}>Next</p>
            </Link>
    );
};

export default Logo;
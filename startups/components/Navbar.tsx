import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  // @ts-ignore
  return (
    <header className="px-5 py-1.5 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        {/*Company Logo*/}
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={124} height={20} />
        </Link>

        {/*Menu Items*/}
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              {/*Create Startup Button*/}
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden hover:animate-spin" />
              </Link>

              {/*Profile*/}
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                {/*Logout Button */}
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-600 mt-2 hover:animate-out" />
                </button>
              </form>

              {/*Avatar*/}
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;

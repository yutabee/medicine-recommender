import Link from "next/link";
import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export const Header: FC = () => {
  const { data: session, status: loading } = useSession();

  return (
    <header className="fixed top-0 z-50 w-full text-white bg-gray-900 p-4 md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between w-full">
        <Link href={"/"}>
          <h1 className="leading-none text-2xl text-white cursor-pointer">
            💊 薬箱
          </h1>
        </Link>
        <div className="flex items-center">
          {loading === "loading" && <p>Loading...</p>}

          {loading === "unauthenticated" && (
            <div
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
              className="cursor-pointer text-white flex items-center"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Sign in
            </div>
          )}

          {session && session.user && (
            <div className="flex items-center space-x-4">
              <span className="text-white">{session.user.name}</span>
              <Image
                className="rounded-full"
                width={40}
                height={40}
                src={session.user.image || "/images/non-image.png"}
                alt={session.user.name || "noname"}
              />
              <div
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
                className="cursor-pointer text-white flex items-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Sign out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

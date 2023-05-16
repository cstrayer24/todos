import { GetServerSideProps } from "next";
import { User } from "@prisma/client";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import Home from "@/components/home";

export const UserPage = ({ user }: { user: User }) => {
  const router = useRouter();

  // Show success message
  return <Home />;
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  try {
    const { id } = params as { [key: string]: string };
    const user = await prisma.user.findFirst({ where: { id: id } });

    if (!user) {
      return {
        notFound: true,
        redirect: {
          destination: "/pages/signin",
        },
      };
    }
    return {
      props: { user },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import AppHeader from "../components/Header/AppHeader";
import { GetStaticProps } from "next";

const Custom404 = () => {
  const t = useTranslations("Others");
  return (
    <>
      <AppHeader title="Page Not Found - Omuk Dokan" />
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-2xl">{t("page_not_found")}</h1>
        <Image
          src="/bg-img/404.svg"
          alt="404 Page Not Found"
          width={400}
          height={300}
        />
        <span className="text-gray400">
          {t("go_back_to")}{" "}
          <Link href="/">
            <span className="underline font-bold hover:text-gray500">home page</span>
          </Link>
          ?
        </span>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../locales/${locale}.json`)).default,
    },
  };
};

export default Custom404;

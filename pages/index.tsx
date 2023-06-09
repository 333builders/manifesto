import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount, useSignMessage } from "wagmi";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import manifest from "../lib/manifest";
import MyDialog from "../components/modal";
import MySignature from "../components/signature";

export type Signature = {
  address: string;
  signature: string;
  date: string;
};
const fetcher = (args: RequestInfo | URL) =>
  fetch(args).then((res) => res.json());

const pageMultiple = 5;

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const {
    data,
    error: errorSignatures,
    isLoading: isLoadingSignatures,
    mutate,
  } = useSWR("/api/signatures", fetcher);
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isSigning, setSigning] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);

  const verify = async () => {
    try {
      setSigning(true);
      const signedMessage = await signMessageAsync({
        message: manifest,
      });
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({
          address: address,
          signature: signedMessage,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        mutate();
        setIsOpenModalSuccess(true);
      } else throw new Error();
    } catch {
      setIsOpenModalError(true);
    } finally {
      setSigning(false);
    }
  };

  const signatures: Signature[] = data;
  let alreadySigned =
    signatures &&
    signatures.some((value) => {
      return value.address == address;
    });
  const currentSignatures = signatures?.slice(page, page + pageMultiple);

  return (
    <div className="pt-3 bg-[#f6f6f6] overflow-x-hidden relative">
      <Head>
        <title>Manifesto 333builders</title>
        <meta
          content="Sign our Manifesto and become a builder!"
          name="description"
        />
        <link href="/favicon.png" rel="icon" />
      </Head>
      <nav className="flex w-full sm:w-10/12 items-center mx-auto space-x-5 font-Inter px-2">
        <div className="grow">
          <a href="https://333builders.com">
            <Image
              src="/logo_rosso.png"
              width={112}
              height={60}
              priority
              alt="logo"
            ></Image>
          </a>
        </div>
        <div className="font-semibold hover:cursor-pointer hidden md:block">
          <a
            target="_blank"
            href="https://333builders.notion.site/333builders/333-Builders-07e37ec80b8a450480250cbe04260d06"
            rel="noreferrer"
            className="hover:text-[#BF0424]"
          >
            Notion
          </a>
        </div>
        <div className="font-semibold hover:cursor-pointer hidden md:block">
          <a
            target="_blank"
            href="https://discord.com/invite/kWthmQ57dd"
            rel="noreferrer"
            className="hover:text-[#BF0424]"
          >
            Discord
          </a>
        </div>
        <ConnectButton
          chainStatus={"icon"}
          showBalance={false}
        />
      </nav>
      <main>
        <div className="flex flex-col w-full px-3 pt-10">
          <div className="text-4xl mx-auto font-SpaceGrotesk font-bold mt-8 uppercase">
            MANIFESTO
          </div>
          <div className="w-1/4 h-1 bg-[#BF0424] rounded mx-auto mt-8"></div>
          <div className="font-Inter mx-auto w-full max-w-3xl mt-16 space-y-3 italic relative">
            <div className="hidden xl:block absolute -bottom-[50%] -left-[150%]">
              <Image
                src="/Futuristic_city.svg"
                width={1024}
                height={1024}
                priority
                alt="city1"
              ></Image>
            </div>
            <div className="hidden xl:block absolute -bottom-[50%] -right-[150%]">
              <Image
                src="/Futuristic_city2.png"
                width={1024}
                height={1024}
                priority
                alt="city2"
              ></Image>
            </div>
            <p>Web2 fundamentally changed our lives.</p>

            <p>
              Via Web2 we were given a chance to interact with each other and
              close distances among us. Web2 essentially allowed us to record
              our lives on the cloud, and made us live forever in the form of
              binary code.
            </p>

            <p>
              Web2 did give us a lot, but it failed at protecting its users.
              Indeed, the whole web2 ecosystem resulted in profits for a handful
              of companies, which employ the data acquired not only at their
              users&apos; expense, but often against them. Thus, a technology
              that was supposed to set us free, became a mean to exploit us.
            </p>

            <p>
              It is now the moment of taking back control of the web. Thanks to
              blockchain technology, we can now{" "}
              <span className="font-bold">redistribute</span> not only data, but
              <span className="font-bold"> power</span>,{" "}
              <span className="font-bold">rights</span>,{" "}
              <span className="font-bold">responsibilities</span> and,
              ultimately, wealth, in a decentralized manner.
            </p>

            <p>
              Builders believe in the pledge of blockchain technology, the one
              of creating a better,{" "}
              <span className="font-bold">disintermediated future</span>, in
              pursuit of equality.
            </p>

            <p>
              On such assumptions, the community of 333.Builders was born, with
              the goal of becoming the main Italian ecosystem and innovation
              vehicle for web3-related and blockchain-powered projects.
            </p>

            <p>
              As of today, 333.Builders is the first Italian community of
              professionals in the web3 ecosystem, whose mission is to
              accelerate the adoption pace of blockchain technology on a
              national scale first, and towards a global perspective in a second
              moment.
            </p>

            <p>
              We are planning to do so by building a self-sufficient{" "}
              <span className="font-bold">
                ecosystem for the development, acceleration and funding of web3
                solutions
              </span>
              , in which professionals, innovative startups, enterprises and
              investors take part. In 333.Builders everyone can find partners,
              co-founders, consultancy, finances and valuable feedback. Thus, on
              top of a decentralized community, projects are born, supported,
              undertake a due-diligence process and are finally funded.
            </p>
          </div>
          <div className="max-w-xl p-8 rounded-xl border-[#B7B7B7] border-2 mx-auto mt-20 flex flex-col text-center space-y-4">
            <div className="text-xl font-SpaceGrotesk text-[#BF0424] font-semibold">
              Sign our Community Manifesto
            </div>
            <p className="font-Inter font-medium">
              By doing so you share our values and adhere to the community
              mission
            </p>
            <div className="mx-auto">
              {mounted && isConnected ? (
                <>
                  {alreadySigned ? (
                    <p className="font-Inter font-semibold text-lg">
                      Thank you for signing our Manifesto, builder! 🤩
                    </p>
                  ) : (
                    <>
                      {isSigning ? (
                        <button className="py-2 px-4 bg-[#BF0424] rounded-xl text-white font-semibold text-lg flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3 fill-[#BF0424]"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>{" "}
                          Signing...
                        </button>
                      ) : (
                        <button
                          onClick={verify}
                          className="py-2 px-4 hover:cursor-pointer hover:scale-105 bg-[#BF0424] rounded-xl text-white font-semibold text-lg"
                        >
                          Sign message
                        </button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <ConnectButton label="Connect Wallet First" />
                </>
              )}
            </div>
          </div>
          <div className="max-w-xl p-8 rounded-xl font-SpaceGrotesk border-[#B7B7B7] border-2 mx-auto mt-20 mb-10 w-full flex flex-col space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/signature_hand.png"
                width={41}
                height={40}
                alt="signature-icon"
              />
              <div className="grow">
                <p className="text-xl text-[#BF0424] font-semibold">
                  Signatoors
                </p>
                <p>
                  Copy and{" "}
                  <a
                    href="https://app.mycrypto.com/verify-message"
                    className="text-[#BF0424] hover:underline"
                  >
                    verify message
                  </a>
                </p>
              </div>
              <div className="flex flex-col text-center">
                {isLoadingSignatures || errorSignatures ? (
                  <div className="animate-pulse w-14 h-10 bg-[#ECECEC] rounded-xl"></div>
                ) : (
                  <div className="text-2xl font-bold">
                    {String(signatures.length).padStart(3, "0")}
                  </div>
                )}
                <div className="text-xs font-bold">Signatures</div>
              </div>
            </div>
            {isLoadingSignatures || errorSignatures ? (
              <>
                <div className="animate-pulse w-full h-24 bg-[#ECECEC] rounded-xl mx-2"></div>
                <div className="animate-pulse w-full h-24 bg-[#ECECEC] rounded-xl mx-2"></div>
                <div className="animate-pulse w-full h-24 bg-[#ECECEC] rounded-xl mx-2"></div>
              </>
            ) : (
              <>
                {currentSignatures.map((item: Signature) => (
                  <MySignature signature={item} key={item.address} />
                ))}
              </>
            )}
            <div className="flex space-x-4 w-fit mx-auto">
              {page > 0 && (
                <div
                  className="mt-8 mx-auto w-20 border-[#BF0424] border-2 rounded-2xl py-2 px-3 hover:cursor-pointer hover:scale-105"
                  onClick={() => setPage((page) => page - pageMultiple)}
                >
                  <div className="flex items-center">
                    <svg
                      width={30}
                      height={30}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="rotate-180"
                    >
                      <path
                        d="M4.469 13.188a.759.759 0 01-.235-.556c0-.213.079-.398.235-.554L9.047 7.5 4.453 2.906a.742.742 0 01-.219-.547c0-.218.079-.406.235-.562a.759.759 0 01.555-.234c.213 0 .398.078.554.234l5.25 5.266c.063.062.107.13.133.203.027.073.04.15.039.234a.686.686 0 01-.04.234.554.554 0 01-.132.204l-5.265 5.265a.733.733 0 01-.54.219.756.756 0 01-.554-.235z"
                        fill="#000"
                      />
                    </svg>
                    <span className="font-bold">Prev</span>{" "}
                  </div>
                </div>
              )}
              {page + pageMultiple < signatures?.length && (
                <div
                  className="mt-8 mx-auto w-20 border-[#BF0424] border-2 rounded-2xl py-2 px-3 hover:cursor-pointer hover:scale-105"
                  onClick={() => setPage((page) => page + pageMultiple)}
                >
                  <div className="flex items-center">
                    <span className="font-bold">Next</span>{" "}
                    <svg
                      width={30}
                      height={30}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.469 13.188a.759.759 0 01-.235-.556c0-.213.079-.398.235-.554L9.047 7.5 4.453 2.906a.742.742 0 01-.219-.547c0-.218.079-.406.235-.562a.759.759 0 01.555-.234c.213 0 .398.078.554.234l5.25 5.266c.063.062.107.13.133.203.027.073.04.15.039.234a.686.686 0 01-.04.234.554.554 0 01-.132.204l-5.265 5.265a.733.733 0 01-.54.219.756.756 0 01-.554-.235z"
                        fill="#000"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <MyDialog
        status="success"
        isOpen={isOpenModalSuccess}
        setIsOpen={setIsOpenModalSuccess}
      />
      <MyDialog
        status="error"
        isOpen={isOpenModalError}
        setIsOpen={setIsOpenModalError}
      />
      <footer className="bg-[#1f232c] w-full mt-10 flex flex-col">
        <div className="mx-auto mt-3">
          <Image
            src="/333B_LogoBianco_Tondo.png"
            width={112}
            height={60}
            priority
            alt="logo"
          ></Image>
        </div>
        <div className="mx-auto space-x-8 my-10 font-Inter font-medium text-slate-200">
          <a href="https://333builders.notion.site/333builders/333-Builders-07e37ec80b8a450480250cbe04260d06" className="hover:cursor-pointer">Notion</a>
          <a href="https://discord.com/invite/kWthmQ57dd" className="hover:cursor-pointer">Discord</a>
          <a href="https://www.linkedin.com/company/333-builders/" className="hover:cursor-pointer">LinkedIn</a>
          <a href="https://youtube.com/channel/UCsxVs7fc9--kQ-K3QJPnupQ" className="hover:cursor-pointer">YouTube</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

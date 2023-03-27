import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Dispatch, SetStateAction } from "react";

export default function MyModal({
  status,
  isOpen,
  setIsOpen,
}: {
  status: "error" | "success";
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-medium leading-6 text-gray-900"
                  >
                    {status == "error" ? (
                      <>Ooops, something went wrong! 🤯</>
                    ) : (
                      <>Glad to have you among us Builder! 🎉</>
                    )}
                  </Dialog.Title>
                  {status == "error" ? (
                    <div className="mt-2">
                      <p className="text-gray-500 text-lg">
                        Try to refresh the page or reconnect your wallet
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-500">
                        Here&apos;s how you can contribute even more to the cause:
                      </p>
                      <p className="ml-4 hover:text-[#BF0424] hover:scale-105"><a href="https://333builders.notion.site/333-Career-8951256caf644c709654d915aa599a2c" target="_blank" rel="noreferrer"><span className="text-xl">🔨</span> Become a builder</a></p>
                      <p className="ml-4 hover:text-[#BF0424] hover:scale-105"><a href="https://calendly.com/333builders" target="_blank" rel="noreferrer"><span className="text-xl">🙋‍♂️</span> Talk to the Core Team</a></p>
                      <p className="ml-4 hover:text-[#BF0424] hover:scale-105"><a href="https://www.notion.so/333builders/Open-Activites-05d4a21438054652bd8199f86ab9728d" target="_blank" rel="noreferrer"><span className="text-xl">👀</span> Have a look to our open positions</a></p>
                    </div>
                  )}

                  <div className="mt-4">          
                      <button
                        type="button"
                        className="py-2 px-4 hover:cursor-pointer hover:scale-105 bg-[#BF0424] rounded-xl text-white font-semibold text-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        Got it, thanks!
                      </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

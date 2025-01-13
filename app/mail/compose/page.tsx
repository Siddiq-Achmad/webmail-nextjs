"use client";

import { Suspense, useActionState } from "react";
import { Paperclip, Trash2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

function DiscardDraftLink() {
  let { name } = useParams();

  return (
    <Link href={`/mail/${name}`} className="text-gray-400 hover:text-gray-600">
      <Trash2 size={20} />
    </Link>
  );
}

function EmailBody({ defaultValue = "" }: { defaultValue?: string }) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div>
      <textarea
        name="body"
        placeholder="Tip: Hit Shift ⏎ to send"
        className="w-full h-[calc(40vh)] resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        onKeyDown={handleKeyDown}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default function ComposePage() {
  return (
    <div className="flex-grow h-full">
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-semibold mb-6">New Message</h1>

        <form className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              To
            </span>
            <input
              type="email"
              name="recipientEmail"
              className="w-full pl-12 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              Subject
            </span>
            <input
              type="text"
              name="subject"
              className="w-full pl-20 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <EmailBody />
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <TooltipProvider>
              <div className="flex space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      className="w-full p-4 bg-black dark:bg-white text-white dark:text-black rounded-md "
                    >
                      Send
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Sending emails is disabled in production</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      className="w-full p-4 bg-black dark:bg-white text-white dark:text-black rounded-md"
                    >
                      Send later
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This feature is not yet implemented</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      className="w-full p-4 bg-black dark:bg-white text-white dark:text-black rounded-md"
                    >
                      Remind me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This feature is not yet implemented</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex mt-4 sm:mt-0 ml-auto space-x-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      disabled
                      type="button"
                      className="cursor-not-allowed text-gray-400 hover:text-gray-600"
                    >
                      <Paperclip size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attachments are not yet implemented</p>
                  </TooltipContent>
                </Tooltip>
                <Suspense fallback={<Trash2 size={20} />}>
                  <DiscardDraftLink />
                </Suspense>
              </div>
            </TooltipProvider>
          </div>
        </form>
      </div>
    </div>
  );
}

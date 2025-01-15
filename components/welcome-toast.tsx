"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    if (!document.cookie.includes("email-toast=1")) {
      toast("📩 Welcome to Next.js Emails!", {
        duration: Infinity,
        onDismiss: () =>
          (document.cookie = "email-toast=1; max-age=31536000; path=/"),
        description: (
          <p>
            This is a demo of an email client UI built with Next.js.
            <a
              href="https://siddiq.luxima.id"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Deploy your own
            </a>
            .
          </p>
        ),
      });
    }
  }, []);

  return null;
}

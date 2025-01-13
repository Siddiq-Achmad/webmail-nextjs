"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Form from "next/form";
import { useEffect, useRef } from "react";

export default function SearchComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, []);
  return (
    <div>
      <Form action="/mail/search" className="w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          ref={inputRef}
          id="search"
          name="q"
          placeholder="Search mail"
          className="w-full pl-10 bg-secondary/50 py-2 focus:outline-none"
          defaultValue={searchParams.get("q") || ""}
        />
      </Form>
    </div>
  );
}

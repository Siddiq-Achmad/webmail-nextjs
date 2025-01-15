"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import { useState } from "react";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  return (
    <div className="hidden lg:flex">
      <Form action="/mail/search" className="w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          id="search"
          name="q"
          placeholder="Search mail"
          className="w-full pl-10 bg-secondary/50 py-2 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form>
    </div>
  );
}

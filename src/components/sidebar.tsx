"use client";
import React, { useEffect } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const data = {
  sections: [
    {
      title: "Practice",
      buttonData: [
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
          ),
          text: "New video",
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          ),
          text: "History",
        },
      ],
    },
    {
      title: "Review",
      buttonData: [
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M21 15V6" />
              <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path d="M12 12H3" />
              <path d="M16 6H3" />
              <path d="M12 18H3" />
            </svg>
          ),
          text: "Words",
        },
      ],
    },
  ],
};

const basePath1 = "/learning/practice";
const basePath2 = "/learning/review";

const sidebarPages = [
  basePath1 + "/new",
  basePath1 + "/list",
  basePath2 + "/words",
];

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  let pathname = usePathname();
  let [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    let tmpPathname = pathname;
    if (pathname.startsWith("/learning/practice/list")) {
      tmpPathname = "/learning/practice/list";
    }
    setSelectedIndex(sidebarPages.indexOf(tmpPathname));
  }, [pathname]);

  const handleClickOnSidebarItem = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {data.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.buttonData.map((button, index) => {
                const currentIndex =
                  data.sections
                    .slice(0, sectionIndex)
                    .reduce(
                      (sum, section) => sum + section.buttonData.length,
                      0
                    ) + index;
                return (
                  <Link href={sidebarPages[currentIndex]} key={currentIndex}>
                    <Button
                      className="w-full justify-start"
                      key={currentIndex}
                      variant={
                        currentIndex === selectedIndex ? "secondary" : "ghost"
                      }
                      onClick={() => handleClickOnSidebarItem(currentIndex)}
                    >
                      {button.icon}
                      {button.text}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

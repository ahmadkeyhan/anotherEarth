"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon"  className="relative h-9 w-9 rounded-full">
        <span className="sr-only">Toggle theme</span>
        <div className="h-4 w-4 bg-primary/20 rounded-full animate-pulse"></div>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-full overflow-hidden group border border-primary/10 bg-background/50 backdrop-blur-sm"
    >
      <Sun className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out dark:opacity-0 dark:rotate-90 dark:scale-0 opacity-100 rotate-0 scale-100 group-hover:text-primary" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out opacity-0 rotate-90 scale-0 dark:opacity-100 dark:rotate-0 dark:scale-100 group-hover:text-primary" />
      <span className="sr-only">Toggle theme</span>
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 group-hover:bg-primary transition-opacity duration-300"></div>
    </Button>
  )

  // let currentTheme = theme;

  // if (theme === "system") {
  //   currentTheme =
  //     typeof window !== "undefined" &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ? "dark"
  //       : "light";
  // }

  // return (
  //   <div className="cursor-pointer bg-background text-primary-green border border-b border-gray-300 p-3 rounded-lg h-full self-center  dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
  //     {currentTheme === "light" ? (
  //       <MoonIcon height={24} width={24} onClick={() => setTheme("dark")} />
  //     ) : (
  //       <SunIcon height={24} width={24} onClick={() => setTheme("light")} />
  //     )}
  //   </div>
  // );
};

export default ThemeSwitcher;

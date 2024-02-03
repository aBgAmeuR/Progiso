"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { Button, Icon } from "@tremor/react";
import { useTheme } from "next-themes";

type Props = {
  // variant?: "primary" | "secondary"
  variant?: "secondary"
}


export function ThemeToggle({ variant = "secondary" }: Props) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant={variant}
      size="xs"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="size-[34px]"
    >
      {/* <Icon icon={SunIcon} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" color={variant === "primary" ? "white" : "blue"} />
      <Icon icon={MoonIcon} className="absolute -translate-x-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" color={variant === "primary" ? "white" : "blue"} /> */}
      <Icon icon={SunIcon} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" color="blue" />
      <Icon icon={MoonIcon} className="absolute -translate-x-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" color="blue" />
    </Button>
  )
}
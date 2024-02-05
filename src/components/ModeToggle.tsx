import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "./themeProvider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Avatar className="bg-[#F0AB78]">
      <Button
        variant={"ghost"}
        size="icon"
        className="flex items-center space-x-2 p-2 bg-transparent"
      >
        <Sun
          className="text-black h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          onClick={() => setTheme("dark")}
        />
        <Moon
          className="text-black  absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          onClick={() => setTheme("light")}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </Avatar>
  );
}

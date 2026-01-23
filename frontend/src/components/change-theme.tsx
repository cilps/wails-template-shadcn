import { type Theme, useTheme } from "@/components/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { shouldAnimateViewTransition } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

export function ChangeTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      variant="outline"
      value={[theme]}
      onValueChange={(theme) => {
        if (!theme[0]) return;
        if (shouldAnimateViewTransition()) {
          document.startViewTransition(() => {
            setTheme(theme[0] as Theme);
          });
        } else {
          setTheme(theme[0] as Theme);
        }
      }}
    >
      <ToggleGroupItem value="dark">
        <MoonIcon /> Dark
      </ToggleGroupItem>
      <ToggleGroupItem value="light">
        <SunIcon /> Light
      </ToggleGroupItem>
      <ToggleGroupItem value="system">
        <MonitorIcon /> System
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

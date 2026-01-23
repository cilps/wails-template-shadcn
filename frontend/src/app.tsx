import { BrowserOpenURL } from "../wailsjs/runtime";
import "./app.css";
import "./variants.css";
import { ChangeTheme } from "@/components/change-theme";
import { ChangeVariant } from "@/components/change-variant";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  return (
    <ThemeProvider>
      <Toaster richColors position="top-center" />
      <div className="flex h-screen w-screen">
        <Card className="m-auto">
          <CardHeader>
            <CardTitle>Wails shadcn/ui template</CardTitle>
            <CardDescription>
              With Base UI &{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                theme-provider.tsx
              </code>{" "}
              a custom theme and variant provider powered by{" "}
              <a
                className="cursor-pointer underline transition hover:text-primary"
                onClick={() => BrowserOpenURL("https://tweakcn.com")}
              >
                tweakcn.com
              </a>
              .
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button onClick={() => toast.success("Cats are better than dogs.")}>
              Click here for super secret secret
            </Button>
            <p>or change the theme here:</p>
            <ChangeTheme />
            <p>
              and even custom variants, that makes your app truly customizable!
            </p>
            <ChangeVariant />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

import {
  useVariant,
  type Variant,
  variants,
} from "@/components/theme-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sentenceCase, shouldAnimateViewTransition } from "@/lib/utils";

export function ChangeVariant() {
  const { variant, setVariant } = useVariant();

  return (
    <Select
      value={variant}
      onValueChange={(variant) => {
        if (shouldAnimateViewTransition()) {
          document.startViewTransition(() => {
            setVariant(variant as Variant);
          });
        } else {
          setVariant(variant as Variant);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue>{sentenceCase(variant)}</SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {variants.map((variant) => (
          <SelectItem key={variant} value={variant}>
            {sentenceCase(variant)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

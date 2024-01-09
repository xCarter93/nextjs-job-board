// Importing necessary libraries and utilities
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

// Exporting a forwardRef component. This component is a wrapper around the HTMLSelectElement
// and it accepts all the props that a normal HTMLSelectElement would.
export default forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  // The component returns a div that contains a select element and a ChevronDown icon.
  // The select element has several classes for styling and it accepts all the props passed to the Select component.
  // The ref is also passed to the select element for potential use in parent components.
  return (
    <div className="relative">
      <select
        className={cn(
          "h-10 w-full border rounded-md appearance-none truncate bg-background border-input py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      {/* The ChevronDown icon is positioned absolutely within the div. It's used as a dropdown indicator for the select element. */}
      <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
    </div>
  );
});

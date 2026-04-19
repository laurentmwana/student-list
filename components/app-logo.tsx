import { cn } from "@/lib/utils";

type Props = { className?: string };

export const AppLogo = ({ className }: Props) => {
  return (
    <div className={cn("text-xl font-semibold", className)}>StudentList</div>
  );
};

import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-3 items-center mt-24">
        <Icons.spinner className="h-16 w-16 animate-spin" />
        <h3 className="font-semibold leading-none tracking-tight text-xl">
          Loading...
        </h3>
      </div>
    </div>
  );
}

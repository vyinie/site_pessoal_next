import {
  SkeletonCard,
  SkeletonForm,
  SkeletonTab,
} from "@/components/projects/components/global/skeletonCoponents";
import "@/components/projects/finnance/dashboard/cards/style.css";

export default async function DebtsLoading() {
  return (
    <div className="flex flex-col items-center desktop max-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="mt-3 flex mobile:flex-col gap-5 justify-center items-center px-5">
        <div className="p-2 border-solid border-y border-neutral-400 dark:border-neutral-600 mt-3 w-fit flex flex-wrap items-center justify-center content-center gap-2 dark:text-white dark:text-opacity-60">
          <SkeletonForm className="w-48" />
          <SkeletonForm className="w-28" />
          <SkeletonForm className="w-28" />
          <SkeletonForm className="w-40" />
          <SkeletonForm className="w-28" />
        </div>

        <SkeletonCard className="w-52" />
      </div>
      <div className="w-[95%] p-2 mt-4 skeletonShape dark:bg-opacity-50 grid gap-2">
        <SkeletonTab className="h-12" />
        <SkeletonTab />
        <SkeletonTab />
        <SkeletonTab />
        <SkeletonTab />
        <SkeletonTab />
        <SkeletonTab />
        <SkeletonTab />
      </div>
    </div>
  );
}
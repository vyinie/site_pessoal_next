import {
  SkeletonCard,
  SkeletonForm,
  SkeletonTab,
} from "@/components/projectsComponents/components/global/skeletonCoponents";
import "@/components/projectsComponents/finnance/dashboard/cards/style.css";

export default async function DashboeardLoading() {
  return (
    <div className="flex flex-col items-center desktop max-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="cardsContainer">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard className="w-60" />
      </div>

      <div className="py-2 border-solid border-y-[1px] border-neutral-400 dark:border-neutral-600 mt-3 w-[95%] flex flex-wrap items-center justify-evenly content-center gap-5 dark:text-white dark:text-opacity-60">
        <SkeletonForm className="w-48" />
        <SkeletonForm className="w-28" />
        <SkeletonForm className="w-40" />
        <SkeletonForm className="w-40" />
        <SkeletonForm className="w-40" />
        <SkeletonForm className="w-28" />
      </div>
      <div className="w-[95%] p-2 mt-4 skeletonShape dark:bg-opacity-50 grid gap-2">
        <SkeletonTab className="h-12" />
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

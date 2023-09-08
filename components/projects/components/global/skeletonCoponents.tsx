export async function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={`${className || "w-40"} skeletonShape h-24`}
    ></div>
  );
}

export async function SkeletonForm({ className }: { className?: string }) {
  return (
    <div
      className={`${className || "w-28"} h-9 skeletonShape`}
    ></div>
  );
}
export async function SkeletonTab({ className }: { className?: string }) {
  return (
    <div
      className={`${className || "h-10"} w-full skeletonShape`}
    ></div>
  );
}

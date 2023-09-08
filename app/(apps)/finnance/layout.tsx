import ProjectHeader from "@/components/projects/components/ProjectHeader";
import FinnanceSideBar from "@/components/projects/finnance/aside/aside";

export default function finnanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="template bg-slate-50">
      <ProjectHeader title="Finnance" />
      <FinnanceSideBar />

      {typeof window != "undefined" && children}
    </div>
  );
}

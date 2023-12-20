import ProjectHeader from "@/components/commonComponents/ProjectHeader";
import FinnanceSideBar from "@/components/projectsComponents/finnance/aside/aside";

export default function finnanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="template bg-slate-50">
      <ProjectHeader title="Finnance" />
      <FinnanceSideBar />

      {children}
    </div>
  );
}

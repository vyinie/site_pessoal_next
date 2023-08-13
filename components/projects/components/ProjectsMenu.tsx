'use client'
export default function ProjectsMenu({ projectSelected, setMenuProjects }) {
  return (
    <div
      onClick={(e: any) => setMenuProjects(e.target.id, e.target.className)}
      className="mt-12 text-3xl flex items-center justify-center flex-wrap gap-3 px-2"
    >
      <span
        className={`${
          projectSelected === "apps"
            ? "border-b-sky-500"
            : "border-b-transparent"
        } selectProjectBtn`}
        id="apps"
      >
        Apps
      </span>
      <span
        className={`${
          projectSelected === "LP" ? "border-b-sky-500" : "border-b-transparent"
        } selectProjectBtn`}
        id="LP"
      >
        Landing Pages
      </span>
      <span
        className={`${
          projectSelected === "games"
            ? "border-b-sky-500"
            : "border-b-transparent"
        } selectProjectBtn`}
        id="games"
      >
        Jogos
      </span>
    </div>
  );
}

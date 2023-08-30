export default function ColoRGBLifes({ lifes }: { lifes: number[] }) {
  return (
    <div className="w-[130px] h-[45px] grid grid-cols-3 place-items-center gap-1 border-neutral-500 border-2 rounded-md">
      {lifes.map((i) => (
        <p key={i} className="text-3xl" id={`life${i}`}>
          &#10084;
        </p>
      ))}
    </div>
  );
}

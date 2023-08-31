export default function ColoRGBLifes({ lifes }: { lifes: number[] }) {
  return (
    <div className="w-10/12 h-[45px] moblet:w-[45px] moblet:h-32  grid grid-cols-3 moblet:grid-cols-1 moblet:grid-rows-3 place-items-center gap-1 border-neutral-500 border-2 rounded-md">
      {lifes.map((i) => (
        <p key={i} className="text-3xl" id={`life${i}`}>
          &#10084;
        </p>
      ))}
    </div>
  );
}

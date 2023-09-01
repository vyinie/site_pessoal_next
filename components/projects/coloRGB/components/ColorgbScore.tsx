export default function ColorgbScore({
  score,
}: {
  score: {
    score: number;
    highScore: number;
  };
}) {
  return (
    <div className="w-full h-fit py-2 mt-4 flex flex-col items-center text-2xl border-neutral-500 border-2 rounded-md">
      {score.score}
      <hr className="w-11/12 border-black" />
      {score.highScore}
    </div>
  );
}

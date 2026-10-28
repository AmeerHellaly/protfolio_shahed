/** Project titles: the first half in ink, the second half in the pink accent. */
export default function SplitTitle({ text }: { text: string }) {
  const words = text.split(" ");
  if (words.length < 2) return <em>{text}</em>;
  const cut = Math.floor(words.length / 2);
  return (
    <>
      {words.slice(0, cut).join(" ")} <em>{words.slice(cut).join(" ")}</em>
    </>
  );
}

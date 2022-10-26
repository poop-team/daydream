import ImageCard from "../components/Surfaces/ImageCard";

const mockData = [
  {
    id: 1,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    saveCount: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 2,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.".repeat(
      100
    ),
    saveCount: 420,
    authorName: "John Doe",
    authorAvatar: "",
  },
  {
    id: 3,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    saveCount: 3697,
    authorName: "Very Long Naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaame",
    authorAvatar: "/test.png",
  },
];

export default function Feed() {
  return (
    <main className={"flex min-h-screen items-center justify-center"}>
      <div className={"flex flex-wrap justify-evenly gap-4 px-8 pt-24 pb-8"}>
        {mockData.map((data) =>
          [1, 2, 3, 4, 5, 6].map((i) => (
            <ImageCard key={data.id + i} {...data} />
          ))
        )}
      </div>
    </main>
  );
}

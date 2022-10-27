import ImageCard from "../components/Surfaces/ImageCard";

const mockData = [
  {
    id: 1,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/test.png",
  },
  {
    id: 2,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.".repeat(
      100
    ),
    likes: 420,
    authorName: "Elon Musk",
    authorAvatar: "",
  },
  {
    id: 3,
    src: "/test.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 3697,
    authorName: "Very Long Naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaame",
    authorAvatar: "/test.png",
  },
];

export default function Feed() {
  return (
    <main>
      <div
        className={
          "grid grid-cols-fill-10 justify-items-center gap-2 py-4 px-2 sm:grid-cols-fill-20 sm:px-4 md:grid-cols-fill-30 md:gap-4 lg:px-8 xl:grid-cols-fill-40"
        }
      >
        {mockData.map((data) =>
          [1, 2, 3, 4, 5, 6].map((i) => (
            <ImageCard
              key={data.id + i}
              {...data}
              className={"h-full w-full"}
            />
          ))
        )}
      </div>
    </main>
  );
}

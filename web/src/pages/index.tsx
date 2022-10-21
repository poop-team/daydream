import Button from "../components/Inputs/Button";

export default function Index() {
  return (
    <section
      className={
        "flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-slate-50"
      }
    >
      <h1 className={"mb-8 text-3xl font-bold sm:text-4xl"}>
        Components Playground
      </h1>
      <div className={"flex gap-4"}>
        <h3 className={"mt-auto text-2xl font-bold"}>Button</h3>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Primary</h3>
          <Button>Click Here</Button>
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Disabled</h3>
          <Button disabled>Disabled</Button>
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Loading</h3>
          <Button loading>Loading</Button>
        </div>
      </div>
    </section>
  );
}

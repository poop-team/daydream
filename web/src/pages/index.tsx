import Button from "../components/Inputs/Button";
import TextField from "../components/Inputs/TextField";
import Card from "../components/Surfaces/Card";

export default function Index() {
  return (
    <section
      className={
        "flex min-h-screen flex-col items-center justify-center gap-16 overflow-hidden bg-slate-50"
      }
    >
      <h1 className={"mb-8 text-3xl font-bold sm:text-4xl"}>
        Components Playground
      </h1>
      <section className={"flex gap-4"}>
        <h3 className={"mt-auto text-2xl font-bold"}>Button</h3>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Contained</h3>
          <Button>Click Here</Button>
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Text</h3>
          <Button variant={"text"}>Click Here</Button>
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Disabled</h3>
          <Button disabled>Disabled</Button>
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Loading</h3>
          <Button loading>Loading</Button>
        </div>
      </section>
      <section className={"flex gap-4"}>
        <h3 className={"mt-8 self-center text-2xl font-bold"}>Text Field</h3>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Default</h3>
          <TextField label={"Label"} placeholder={"Enter something"} />
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Invalid</h3>
          <TextField
            label={"Label"}
            placeholder={"Enter something"}
            error
            helperText={"Incorrect data entered"}
          />
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Disabled</h3>
          <TextField
            label={"Label"}
            value={"Disabled"}
            placeholder={"Enter something"}
            disabled
          />
        </div>
        <div className={"flex flex-col items-center gap-8"}>
          <h3 className={"text-xl font-bold"}>No Label</h3>
          <TextField placeholder={"Enter something"} />
        </div>
        <div className={"flex flex-col items-center gap-2"}>
          <h3 className={"text-xl font-bold"}>Controlled Value</h3>
          <TextField
            label={"Label"}
            value={"Something something"}
            placeholder={"Enter something"}
          />
        </div>
      </section>
      <section className={"flex items-center gap-4"}>
        <h3 className={"text-2xl font-bold"}>Card</h3>
        <Card className={"h-72 w-96 bg-slate-200"} />
      </section>
    </section>
  );
}

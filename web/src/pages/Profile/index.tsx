import Card from "../../components/Surfaces/Card";

/*
 *
 * Note to viewer:
 * Please bully, I must learn the error in my ways.
 *
 * */

export default function Index() {
  return (
    <>
      {/* TOP BORDER */}
      <div className="p-4"></div>

      {/* PROFILE PICTURE */}
      <div className="container mx-auto">
        {/* START PHOTO PADDING */}
        <div className="p-4"></div>
        {/* FLEX-SEAL (wrap*) */}
        <div className="flex flex-wrap items-center justify-center">
          <a href="#" className="relative block">
            {/* PROFILE PICTURE DATA */}
            <img
              className="custom-position h-24 w-24 rounded-full object-cover"
              src="https://avatars.githubusercontent.com/u/79925808?v=4"
              alt="name"
            />
          </a>
        </div>
        {/* END PHOTO PADDING */}
        <div className="p-4"></div>
      </div>

      {/* USERNAME */}
      {/* VIEWS / SAVED */}
      {/* CREATED / COLLECTIONS */}
      {/* SEARCH / +CREATE */}

      {/* CARDS */}
      <div className="px-4">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-600"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-700"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-600"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-700"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-600"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-700"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-600"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-700"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-600"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-700"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-600"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-700"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-600"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-700"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-600"} />
          </section>
          <section className={"flex gap-4"}>
            <Card className={"h-80 w-80 bg-slate-700"} />
          </section>
        </div>
      </div>
    </>
  );
}

/*
lol
https://avatars.githubusercontent.com/u/79925808?v=4
*/

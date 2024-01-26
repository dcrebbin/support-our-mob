export default function Popup(): JSX.Element {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 text-white m-2 font-sans">
      <div className="flex flex-col items-center justify-center text-white pb-3">
        <div className="w-full text-center">
          <h1 className="text-xl font-serif">Support Our Mob 🖤💛❤️</h1>
        </div>
        <hr className="text-white"></hr>
        <div className="flex flex-col gap-1">
          <p>
            Created by{" "}
            <a className="underline" href="https://itsourland.org.au">
              Ourland Indigenous Corporation
            </a>
          </p>
          <p>
            For more information contact{" "}
            <a className="underline" href="mailto:devon@itsourland.org.au">
              devon@itsourland.org.au
            </a>
          </p>
          <a className="underline" href="https://github.com/dcrebbin/support-our-mob">
            Open source Github repository
          </a>
        </div>
      </div>
    </div>
  );
}

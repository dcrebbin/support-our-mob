export default function Popup(): JSX.Element {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 text-white m-2 font-sans">
      <div className="flex flex-col items-center justify-center text-white pb-3">
        <div className="w-full text-center">
          <h1 className="text-xl font-serif">Support Our Mob 🖤💛❤️</h1>
        </div>
        <hr className="text-white"></hr>
        <div className="flex flex-col gap-1">
          <div>
            Created by{" "}
            <button
              onClick={() => {
                chrome.tabs.create({ url: "https://itsourland.org.au" });
              }}
              className="underline"
            >
              Ourland Indigenous Corporation
            </button>
          </div>
          <div>
            For more information contact{" "}
            <button
              onClick={() => {
                chrome.tabs.create({ url: "mailto:devon@itsourland.org.au" });
              }}
              className="underline"
            >
              devon@itsourland.org.au
            </button>
          </div>
          <button
            onClick={() => {
              chrome.tabs.create({ url: "https://github.com/dcrebbin/support-our-mob" });
            }}
            className="underline"
          >
            Open source Github repository
          </button>
        </div>
      </div>
    </div>
  );
}

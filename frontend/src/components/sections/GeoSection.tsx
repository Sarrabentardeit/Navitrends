const places = [
  { region: "United Kingdom", detail: "Commercial office, London E1" },
  { region: "Europe", detail: "Delivery across France, Germany, Benelux" },
  { region: "North Africa", detail: "Engineering team based in Tunisia" },
  { region: "Middle East", detail: "Programmes in the Gulf" },
];

export default function GeoSection() {
  return (
    <section className="border-b border-[#e6e9f2]">
      <div className="wrap py-20 lg:py-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="kicker mb-4">Where we work</p>
          <h2 className="serif text-4xl leading-tight mb-6">
            A UK firm with an engineering bench that can actually ship.
          </h2>
          <p className="text-[#5b6178] leading-relaxed">
            Clients speak to London. The build happens with a senior technical
            team in Tunisia that has been doing industrial systems for years —
            not a body shop rotated every quarter.
          </p>
        </div>
        <ul className="lg:col-span-6 lg:col-start-7">
          {places.map((place) => (
            <li
              key={place.region}
              className="flex items-baseline justify-between gap-6 py-5 border-t border-[#e4e7ef] last:border-b"
            >
              <span className="serif text-xl">{place.region}</span>
              <span className="text-sm text-[#5b6178] text-right">
                {place.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

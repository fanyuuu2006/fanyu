import Image from "next/image";

export const IndexSection = () => {
  return (
    <section>
      <div className="container d-flex justify-center" style={{gap: "1em"}}>
        <div
          className="card d-flex flex-column align-items-center"
          style={{
            width: "300px",
            padding: "1em",
            gap: "1em",
          }}
        >
          <Image
            src="/CampPhoto.jpg"
            className="bordered"
            width={1080}
            height={1080}
            alt="Camp Photo"
            style={{
              width: "250px",
              height: "auto",
              borderRadius: "100%",
            }}
          />
          <div className="label">范余振富</div>
        </div>
        <div
          className="card bordered"
          style={{
            flex: 1,
          }}
        >
          
        </div>
      </div>
    </section>
  );
};

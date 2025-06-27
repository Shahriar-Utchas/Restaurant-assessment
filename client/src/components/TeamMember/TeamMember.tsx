import Image from "next/image";

export default function TeamMember() {
  const members = [
    { id: 1, name: "Mark Henry", role: "Owner", image: "/assets/member.jpg" },
    { id: 2, name: "Lucky Helen", role: "Chef", image: "/assets/member.jpg" },
    { id: 3, name: "Moon Henry", role: "Founder", image: "/assets/member.jpg" },
    { id: 4, name: "Tom Monrow", role: "Specialist", image: "/assets/member.jpg" },
  ];

  return (
    <section className="relative bg-white">
      {/* Header Section */}
      <div className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/Member_bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#AD1519D9]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10 mb-30">
          <h1 className="text-3xl md:text-4xl font-bold">Team Member</h1>
          <p className="mt-3 max-w-xl text-sm md:text-base">
            Our team is a group of passionate individuals dedicated to providing the best dining experience. From our chefs to our service staff, we work together to create memorable moments for our guests.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-20 px-4 pt-0 -mt-36 pb-16 max-w-7xl mx-auto flex flex-wrap justify-center items-end gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white w-36 sm:w-40 md:w-44 lg:w-64 shadow-md rounded-md overflow-hidden"
          >
            {/* Image*/}
            <div className="relative w-full aspect-square group overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Text info */}
            <div className="p-3 text-center">
              <h3 className="text-base lg:text-xl font-semibold mb-1 text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-500 text-xs lg:text-sm">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

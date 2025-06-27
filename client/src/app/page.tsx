import Banner from "@/components/Header/Banner";
import Feedback from "@/components/Feedback/Feedback";
import Foods from "@/components/Foods/Foods";
import Partner from "@/components/Partner/Partner";
import TeamMember from "@/components/TeamMember/TeamMember";

export default function Home() {
  return (
    <>
    <div className="overflow-x-hidden">
      <Banner />
      <Foods />
      <Feedback />
      <TeamMember />
      <Partner />
      </div>
    </>
  );
}

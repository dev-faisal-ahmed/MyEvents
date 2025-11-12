import { Button } from "@/components/ui/button";
import { IoMdArrowForward } from "react-icons/io";

export default function LandingPage() {
  return (
    <section className="mt-32 text-center">
      <h1 className="text-3xl font-bold">
        Plan, Share, Celebrate, Track <br /> Effortlessly.
        <br />
        <span className="underline">MyEvents</span>
      </h1>
      <p className="text-muted-foreground mx-auto mt-6 max-w-1/3 text-sm">
        Organize your events with ease - from planning to sharing. Simplify invitations, manage RSVPs, and keep every detail in one place.
      </p>
      <Button className="mt-6">
        Register / Login <IoMdArrowForward />
      </Button>
    </section>
  );
}

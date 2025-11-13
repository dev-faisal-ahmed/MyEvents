import { useAuth } from "@/providers/auth-provider";
import { GoogleLogin } from "@/features/auth/components/google-login";
import { IoMdArrowForward } from "react-icons/io";
import { Navigate } from "react-router";

export default function LandingPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/" />;

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

      <div className="mt-6">
        <GoogleLogin>
          Register / Login <IoMdArrowForward />
        </GoogleLogin>
      </div>
    </section>
  );
}

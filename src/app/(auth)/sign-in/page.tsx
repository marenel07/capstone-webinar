import Image from "next/image";

import SignInForm from "../components/SignInForm";
import Container from "@/components/Container";

const SignInPage = () => {
  return (
    <div className="bg-maroon md:bg-white">
      <Container>
        <div className="grid grid-cols-12 w-full h-full min-h-screen overflow-y-auto">
          <div className="col-span-full md:col-span-8 flex justify-center items-center p-4">
            <SignInForm />
          </div>
          <div className="col-span-4 bg-maroon md:flex items-center justify-center h-full hidden">
            <Image
              alt="SSU Logo"
              src={"/images/ssu-logo.png"}
              width={200}
              height={200}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;

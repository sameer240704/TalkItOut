import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, ExternalLink } from "lucide-react";
import { Logo, Phone } from "../assets";
import { ModeToggle } from "../components/ui/mode-toggle";
import { Button } from "../components/ui/button";
import { useVerifyUser } from "../hooks/useVerifyUser";

const LandingPage = () => {
  const { verifyUser } = useVerifyUser();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const result = await verifyUser();

      if (result.success) {
        navigate("/talkitout");
      }
    };

    verify();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-white to-green-50 font-sans dark:from-black dark:to-[#011a11] overflow-hidden">
      <nav className="py-4 px-8 flex items-center justify-between border-b bg-white dark:bg-black shadow-md">
        <div className="flex items-center space-x-6">
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="TalkItOut Logo"
              className="h-10 w-auto rounded-sm"
            />
            <span className="ml-2 font-bold text-2xl">TalkItOut</span>
          </a>
          <div className="flex items-center space-x-4 text-gray-700 dark:text-white">
            <Button
              variant="ghost"
              className="px-3 py-1 hover:text-green-600 font-medium"
            >
              Individual
            </Button>
            <Button
              variant="ghost"
              className="px-3 py-1 hover:text-green-600 font-medium"
            >
              Features
            </Button>
            <Button
              variant="ghost"
              className="px-3 py-1 hover:text-green-600 font-medium"
            >
              Privacy
            </Button>
            <Button
              variant="ghost"
              className="px-3 py-1 hover:text-green-600 font-medium"
            >
              Help Center
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <a href="/sign-in">
            <Button
              variant="outline"
              className="text-gray-700 dark:text-white font-medium hover:underline hover:scale-105"
            >
              TalkItOut Web
            </Button>
          </a>
          <Button
            variant="secondary"
            className="px-4 py-2 bg-green-500 text-white flex items-center font-semibold hover:bg-green-600 transition-colors gap-x-2"
          >
            Download
            <Download />
          </Button>
        </div>
      </nav>

      <main className="w-screen mx-auto px-8 py-20 flex-col-center overflow-hidden">
        <div className="space-y-8 flex-col-center">
          <h1 className="text-7xl max-lg:text-6xl font-medium text-gray-800 text-center dark:text-white leading-tight">
            Send A Message To A<br /> Colleague Or Friend
          </h1>
          <p className="text-2xl max-md:text-3xl max-w-xl text-center">
            Effortless, reliable, and secure communication with free calls —
            anywhere, anytime
          </p>
          <a href="/sign-in">
            <Button
              variant="secondary"
              className="h-12 px-6 py-3 bg-green-500 text-white rounded-full flex items-center text-lg font-semibold hover:bg-green-600 transition-colors gap-x-2"
            >
              Go to Login
              <ExternalLink />
            </Button>
          </a>
          <div className="relative flex-row-center">
            <img src={Phone} className="h-[800px] w-auto z-10" />
            <div className="h-[50rem] w-[50rem] border-black rounded-full bg-green-400 absolute top-32 border-2 dark:border-white"></div>
            <div className="h-[60rem] w-[56rem] border-gray-500 rounded-full absolute top-20 border-2"></div>
            <div className="h-[75rem] w-[63rem] border-gray-300 rounded-full absolute top-8 border-2 dark:border-gray-800"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

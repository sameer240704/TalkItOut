import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Apple, Google, Logo } from "../assets";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { useRegister } from "../hooks/useRegister";
import { useVerifyUser } from "../hooks/useVerifyUser";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarImage, setAvatarImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const { register, isLoading, error } = useRegister();
  const { verifyUser } = useVerifyUser();
  const navigate = useNavigate();

  useEffect(() => {
    const result = verifyUser();

    if (result) {
      navigate("/talkitout");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatarImage", avatarImage);

    const result = await register(formData);
    if (result.success) {
      navigate("/talkitout");
    }
  };

  return (
    <div className="h-screen w-screen flex-row-center">
      <div className="h-[80%] w-[60%] flex-row-center rounded-xl overflow-hidden p-4 pl-8 shadow-md border-2 gap-x-2">
        <div className="h-full w-1/2 flex flex-col justify-between">
          <div>
            <a className="h-10" href="/">
              <img src={Logo} className="h-10 w-auto" />
            </a>
            <div className="flex flex-col justify-start mt-6 px-14">
              <h1 className="text-3xl font-medium tracking-wide">
                Get Started Now
              </h1>
              <h3 className="text-sm mt-2">
                Enter your credentials to access your account
              </h3>

              {/* Google and Apple */}
              <div className="mt-5 flex-row-center gap-x-5">
                <Button
                  variant="outline"
                  className="w-1/2 flex-row-center gap-x-2"
                >
                  <img src={Google} className="h-5 w-5" />
                  <h1 className="text-md">Sign up with Google</h1>
                </Button>
                <Button
                  variant="outline"
                  className="w-1/2 flex-row-center gap-x-2"
                >
                  <img src={Apple} className="h-5 w-5" />
                  <h1 className="text-md">Sign up with Apple</h1>
                </Button>
              </div>

              {/* or seperator */}
              <div className="flex-row-center gap-x-3 mt-6">
                <div className="h-0.5 w-full rounded-full bg-gray-300"></div>
                <h3 className="text-gray-500 text-sm">or</h3>
                <div className="h-0.5 w-full rounded-full bg-gray-300"></div>
              </div>

              {/* Input elements */}
              <div className="mt-6 space-y-4">
                <div className="flex flex-col">
                  <Label htmlFor="name" className="mb-2">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="email" className="mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="example@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="password" className="mb-2">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="abc@123"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="picture" className="mb-2">
                    Avatar
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={(e) => setAvatarImage(e.target.files[0])}
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div className="items-top flex space-x-2 mt-5">
                <Checkbox
                  id="terms1"
                  onClick={() => setIsChecked(!isChecked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <a href="/terms-and-policy" className="underline">
                      Terms & Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Register Btn */}
              <Button
                onClick={handleSubmit}
                disabled={!isChecked || isLoading}
                className="mt-8 bg-green-500 text-sm font-semibold hover:bg-green-600 active:scale-95 rounded-md"
                onS
              >
                {isLoading ? "Signing in..." : "Sign Up"}
              </Button>

              <div className="flex justify-start items-center mt-5 gap-x-2">
                <h1 className="text-sm font-medium">
                  Already have an account?
                </h1>
                <a
                  href="/sign-in"
                  className="text-sm font-bold text-green-500 hover:text-green-600"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-[0.75rem] text-gray-400 font-medium">
            MIT License, All Rights Reserved
          </div>
        </div>
        <div className="h-full w-1/2 bg-green-400 rounded-xl"></div>
      </div>
    </div>
  );
};

export default Register;

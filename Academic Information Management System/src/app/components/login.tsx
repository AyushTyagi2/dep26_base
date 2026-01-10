import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GraduationCap, HelpCircle } from "lucide-react";
import exampleImage from "figma:asset/7368855791862caa15937624335082736d21b144.png";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (loginId && password) {
      onLogin();
    }
  };

  const handleCancel = () => {
    setLoginId("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#5D9E9C] text-white px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-6" />
            <span className="font-semibold text-lg">AcadStack</span>
          </div>
          <button className="flex items-center gap-1 text-sm hover:bg-white/10 px-3 py-1.5 rounded transition-colors">
            <HelpCircle className="size-4" />
            <span>Help</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* Left side - Login Form */}
          <div className="w-full max-w-sm">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-slate-200">
              <h2 className="text-xl font-semibold mb-6 text-slate-800">Login</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="loginId" className="text-sm text-slate-700">
                    Login ID:
                  </Label>
                  <Input
                    id="loginId"
                    type="text"
                    placeholder="Your login ID"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm text-slate-700">
                    Password:
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="bg-[#5D9E9C] hover:bg-[#4D8E8C]">
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="flex gap-4 text-sm pt-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    [Password Reset]
                  </button>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    [Alt Login Options]
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right side - Tagline */}
          <div className="w-full max-w-md text-center lg:text-left">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              A System For Managing Academic Information
            </h1>
            <p className="text-sm text-red-600 mb-6">
              By proceeding with the login you agree to the{" "}
              <a href="#" className="underline hover:text-red-700">
                terms of use
              </a>{" "}
              of this service.
            </p>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-600 text-sm leading-relaxed">
                Efficiently manage courses, programs, students, instructors, enrollments, 
                and attendance data to derive actionable analytics for your university.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 text-center py-4 text-sm">
        <p>© 2026 AcadStack. All rights reserved.</p>
      </footer>
    </div>
  );
}

import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Briefcase,
  Calendar,
  Video,
  User
} from "lucide-react";

import logoPath from "../../assets/logo.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Directory", path: "/directory", icon: Users },
    { name: "Hiring", path: "/hiring", icon: Briefcase },
    { name: "Leaves", path: "/leaves", icon: Calendar },
    { name: "Meetings", path: "/meetings", icon: Video },
    { name: "Profile", path: "/profile", icon: User }
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      <aside className="w-64 bg-gray-900 text-white flex flex-col">

        <div className="p-6 border-b border-gray-800">
          <img src={logoPath} alt="AirBuddy Logo" className="w-36" />
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location === item.path;

            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    active
                      ? "bg-teal-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
          AirBuddy Ops
        </div>

      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>

    </div>
  );
}
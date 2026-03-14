import { useQuery } from "@tanstack/react-query";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  status: "online" | "away" | "offline";
  image?: string;
}

export function useTeam() {
  return useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
    queryFn: async () => {
      // For now, we'll return mock data, but this is ready for your API!
      return [
        { id: 1, name: "Aarush Bhagat", role: "Product Manager", department: "Product", email: "aarush@airbuddy.in", status: "online" },
        { id: 2, name: "Alisha Raj", role: "CEO", department: "Management", email: "apurv@airbuddy.in", status: "away" },
        { id: 3, name: "Bibhuti Rajput", role: "Founder ", department: "Design", email: "pragya@airbuddy.in", status: "online" },
        { id: 4, name: "Ishaan Mehta", role: "Backend Dev", department: "Engineering", email: "ishaan@airbuddy.in", status: "offline" },
      ];
    },
  });
}
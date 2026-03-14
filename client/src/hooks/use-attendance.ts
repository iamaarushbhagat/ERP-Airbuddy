import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAttendance() {
  const queryClient = useQueryClient();

  const status = useQuery({
    queryKey: ["/api/attendance/status"],
    queryFn: async () => {
      const res = await fetch("/api/attendance/status");
      if (!res.ok) return { isCheckedIn: false };
      return res.json();
    },
  });

  const checkIn = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/attendance/check-in", { method: "POST" });
      if (!res.ok) throw new Error("Check-in failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/attendance/status"] });
    },
  });

  return { status, checkIn };
}
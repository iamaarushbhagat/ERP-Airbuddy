import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const queryClient = useQueryClient();

  // Check if user is logged in
  const authQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/user", {
        credentials: "include",
      });

      if (res.status === 401) {
        return null;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      return res.json();
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
  });

  return {
    user: authQuery.data,
    isAuthenticated: !!authQuery.data,
    isLoading: authQuery.isLoading,
    error: authQuery.error,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    loginMutation,
    logoutMutation,
  };
}
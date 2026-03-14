import { Route, Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: any;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route path={path} component={Component} />;
}
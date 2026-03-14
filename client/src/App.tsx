import { Switch, Route } from "wouter";

import Layout from "@/components/layout/layout";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Tasks from "@/pages/tasks";
import Directory from "@/pages/directory";
import Hiring from "@/pages/hiring";
import Leaves from "@/pages/leaves";
import Meetings from "@/pages/meetings";
import Profile from "@/pages/profile";

export default function App() {
  return (
    <Switch>

      {/* Login without layout */}
      <Route path="/login" component={Login} />

      {/* All dashboard pages use layout */}
      <Route path="/">
        <Layout>
          <Dashboard />
        </Layout>
      </Route>

      <Route path="/tasks">
        <Layout>
          <Tasks />
        </Layout>
      </Route>

      <Route path="/directory">
        <Layout>
          <Directory />
        </Layout>
      </Route>

      <Route path="/hiring">
        <Layout>
          <Hiring />
        </Layout>
      </Route>

      <Route path="/leaves">
        <Layout>
          <Leaves />
        </Layout>
      </Route>

      <Route path="/meetings">
        <Layout>
          <Meetings />
        </Layout>
      </Route>

      <Route path="/profile">
        <Layout>
          <Profile />
        </Layout>
      </Route>

    </Switch>
  );
}
import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import {
  Users,
  Cpu,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  TrendingUp,
} from "lucide-react";

const Dashbord = () => {
  const api = useApi();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeBuilds: 0,
    serverLoad: "12%",
    systemHealth: "Optimal",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch stats from backend API
        const response = await api.get("/api/users");
        if (response.data) {
          setStats((prev) => ({
            ...prev,
            totalUsers: response.data.length || 0,
          }));
        }
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [api]);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      change: "+12.5%",
      icon: Users,
      badgeColor: "bg-primary/10 text-primary border-primary/20",
    },
    {
      title: "System Builds",
      value: "1,284",
      change: "+8.2%",
      icon: Cpu,
      badgeColor: "bg-secondary/10 text-secondary border-secondary/20",
    },
    {
      title: "Server Load",
      value: stats.serverLoad,
      change: "-2.1%",
      icon: Activity,
      badgeColor: "bg-accent/10 text-accent border-accent/20",
    },
    {
      title: "System Health",
      value: stats.systemHealth,
      change: "100% Uptime",
      icon: ShieldCheck,
      badgeColor: "bg-success/10 text-success border-success/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title Banner
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
            System Overview
          </h1>
          <p className="text-xs text-base-content/60 mt-1">
            Real-time analytics and platform performance metrics.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl bg-base-100 p-2 border border-base-content/10 text-xs font-semibold text-base-content/70">
          <Clock className="h-4 w-4 text-primary" />
          <span>Last synced: Just now</span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-base-content/10 bg-base-100/80 p-5 backdrop-blur-xl shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-base-content/60">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl border ${card.badgeColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-black tracking-tight text-base-content">
                  {loading ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    card.value
                  )}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success">
                  <TrendingUp className="h-3 w-3" />
                  {card.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Table Preview */}
      {/* <div className="rounded-2xl border border-base-content/10 bg-base-100/80 p-6 backdrop-blur-xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-base-content">
              Recent System Events
            </h2>
            <p className="text-xs text-base-content/60">
              Audit log of critical updates and admin operations.
            </p>
          </div>
          <button className="btn btn-ghost btn-xs text-primary gap-1">
            <span>View Logs</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-md w-full">
            <thead>
              <tr className="border-b border-base-content/10 text-xs text-base-content/50">
                <th>Event</th>
                <th>User</th>
                <th>Role</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="hover:bg-base-200/40">
                <td className="font-semibold">User Role Upgrade</td>
                <td>alex.vance@domain.com</td>
                <td>
                  <span className="badge badge-primary badge-xs">Admin</span>
                </td>
                <td>2 mins ago</td>
                <td>
                  <span className="badge badge-success badge-xs">Success</span>
                </td>
              </tr>
              <tr className="hover:bg-base-200/40">
                <td className="font-semibold">Database Sync</td>
                <td>System Auto</td>
                <td>
                  <span className="badge badge-ghost badge-xs">System</span>
                </td>
                <td>15 mins ago</td>
                <td>
                  <span className="badge badge-success badge-xs">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>  */}


      <p className="text-9xl font-bold text-center mt-50">Comming soon!!! In progress!!!</p>
    </div>
  );
};

export default Dashbord;
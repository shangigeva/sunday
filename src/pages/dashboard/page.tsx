// import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "./components/search";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { Button } from "@/components/ui/button";
import { CircleIcon, StopwatchIcon } from "@radix-ui/react-icons";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TodayIcon from "@mui/icons-material/Today";
import EventIcon from "@mui/icons-material/Event";
import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardData } from "@/lib/types";
// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// };

export default function DashboardPage() {
  const [details, setDetails] = useState<DashboardData>({
    openTasks: 0,
    closeTasks: 0,
    closeToday: 0,
    createdToday: 0,
  });
  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data } = await axios.get("tasks/getDashboardData");
        setDetails(data);
      } catch (error) {
        console.error("Error fetching tasks details:", error);
      }
    };
    getDetails();
  }, []);

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <img
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-[#715CF8] text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Open tasks
                    </CardTitle>
                    <FormatListBulletedIcon />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {details.openTasks}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#FF3E89] text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Closed tasks{" "}
                    </CardTitle>
                    <StopwatchIcon />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {details.closeTasks}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#715CF8] text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Opened today
                    </CardTitle>
                    <TodayIcon />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {details.createdToday}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[#FF3E89] text-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Closed today{" "}
                    </CardTitle>
                    <EventIcon />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {details.closeToday}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>This month</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Tasks</CardTitle>
                    <CardDescription>
                      Last 5 tasks ordered by create time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

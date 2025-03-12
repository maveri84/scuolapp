
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AttendanceCard from "@/components/dashboard/AttendanceCard";
import GradesCard from "@/components/dashboard/GradesCard";
import ScheduleCard from "@/components/dashboard/ScheduleCard";
import NotificationsCard from "@/components/dashboard/NotificationsCard";
import StatCard from "@/components/dashboard/StatCard";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { BookOpen, UserCheck, FileText, Bell } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 staggered-fade-in">
        <AnimatedCard delay={1}>
          <StatCard
            title="Presenze Totali"
            value="95%"
            icon={<UserCheck className="h-5 w-5 text-primary" />}
            trend={{ value: 2, positive: true }}
          />
        </AnimatedCard>
        
        <AnimatedCard delay={2}>
          <StatCard
            title="Media Classe"
            value="7.8"
            icon={<FileText className="h-5 w-5 text-primary" />}
            trend={{ value: 0.3, positive: true }}
          />
        </AnimatedCard>
        
        <AnimatedCard delay={3}>
          <StatCard
            title="Lezioni Oggi"
            value="5"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
          />
        </AnimatedCard>
        
        <AnimatedCard delay={4}>
          <StatCard
            title="Comunicazioni"
            value="12"
            icon={<Bell className="h-5 w-5 text-primary" />}
            trend={{ value: 4, positive: false }}
          />
        </AnimatedCard>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AnimatedCard className="h-full" delay={1}>
            <AttendanceCard />
          </AnimatedCard>
        </div>
        
        <div className="lg:col-span-2">
          <AnimatedCard className="h-full" delay={2}>
            <GradesCard />
          </AnimatedCard>
        </div>
        
        <div className="lg:col-span-2">
          <AnimatedCard className="h-full" delay={3}>
            <ScheduleCard />
          </AnimatedCard>
        </div>
        
        <div className="lg:col-span-1">
          <AnimatedCard className="h-full" delay={4}>
            <NotificationsCard />
          </AnimatedCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

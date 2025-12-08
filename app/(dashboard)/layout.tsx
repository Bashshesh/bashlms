import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <div className="flex h-screen overflow-hidden rounded-lg">
          <Sidebar />

          <main className="flex flex-col flex-1">
              <Header />

              {/* 4. СОДЕРЖИМОЕ СТРАНИЦЫ */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                  {children}
              </div>
          </main>
      </div>
    );
}
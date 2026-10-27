import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-[#fff8f6] font-(family-name:--font-dm-sans)">
        <AdminSidebar />
        <main className="flex-1 overflow-auto md:ml-60">
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
}

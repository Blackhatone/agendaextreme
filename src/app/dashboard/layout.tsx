import DashboardLayout from '@/components/layout/DashboardLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | AgendaPro',
  description: 'Panel de administración de AgendaPro',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Website editor | ClaimSafe", robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="admin-body">{children}</body></html>;
}

import { getServerSession } from "next-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (session && session.user && session.user.email) {
    if (process.env.ADMIN_MAILS?.split(" ").includes(session.user.email)) {
      return <>{children}</>;
    } else {
      return <div>{"Ghbdtn))"}</div>;
    }
  } else {
    return <div>{"Ghbdtn))"}</div>;
  }
}

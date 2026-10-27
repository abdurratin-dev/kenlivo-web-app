"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  Package,
  Heart,
  MapPin,
  LockKeyhole,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Mail,
  Phone,
  CalendarDays,
  CheckCircle2,
  Pencil,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import OrderListCard from "@/components/cards/orderListCard";

const menuItems = [
  { name: "My Profile", icon: UserRound },
  { name: "My Orders", icon: Package },
  { name: "My Wishlist", icon: Heart },
  { name: "Address Book", icon: MapPin },
  { name: "Change Password", icon: LockKeyhole },
];

export default function ProfilePage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("My Profile");
  const [editing, setEditing] = useState(false);
  const [orderDeta, setOrderData] = useState([]);
  const { data: session, error } = authClient.useSession();
  const profile = session?.user;

  useEffect(() => {
    console.log(profile?.email);
    const getData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_KENLIVO_DATA_API}product-orders/${profile?.email}`,
      );
      const result = await res.json();
      setOrderData(result);
    };
    getData();
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    // setProfile((prev) => ({
    //   ...prev,
    //   [e.target.name]: e.target.value,
    // }));
  };
  const hendleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditing(false);
    // TODO: Send updated profile to your API.
  };

  return (
    <main className="min-h-screen bg-[#fcf7f5] px-4 py-8 text-[#38251f] sm:px-6 lg:px-10">
      <div className="h-30"></div>
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2 text-sm text-[#9a8580]">
          <a href="/" className="transition hover:text-[#bc6478]">
            Home
          </a>
          <ChevronRight size={15} />
          <span className="font-medium text-[#a84f66]">My Account</span>
        </div>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            My Account
          </h1>
          <p className="mt-2 text-sm text-[#96817b]">
            Manage your personal information and beauty shopping experience.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[290px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="overflow-hidden rounded-2xl border border-[#f0e3df] bg-white shadow-sm">
            {/* User card */}
            <div className="bg-gradient-to-br from-[#f9e4e2] via-[#fcefeb] to-[#f7d8dc] px-6 py-7 text-center">
              <div className="relative mx-auto mb-4 h-24 w-24">
                <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-white bg-[#e8b7b8] text-3xl font-semibold text-[#8e4655] shadow-sm">
                  {profile?.name[0]}
                </div>
              </div>

              <h2 className="text-lg font-semibold">{profile?.name}</h2>
              <p className="mt-1 text-sm text-[#97746e]">{profile?.email}</p>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-[#a54c62]">
                <CheckCircle2 size={14} />
                Beauty Member
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 p-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeMenu === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActiveMenu(item.name)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm transition ${
                      active
                        ? "bg-[#fae9e9] font-semibold text-[#b34e68]"
                        : "text-[#75615b] hover:bg-[#fcf5f3] hover:text-[#b34e68]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} strokeWidth={1.7} />
                      {item.name}
                    </span>
                    <ChevronRight size={15} />
                  </button>
                );
              })}

              <div className="my-3 border-t border-[#f1e8e5]" />

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-[#b34e5e] transition hover:bg-red-50"
                onClick={hendleSignOut}
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>

            {/* Help card */}
            <div className="mx-4 mb-4 rounded-xl bg-[#fcf5f2] p-4">
              <p className="text-sm font-semibold">Need some help?</p>
              <p className="mt-1 text-xs leading-5 text-[#95817a]">
                We are always here to help with your beauty orders.
              </p>
              <a
                href="/contact"
                className="mt-3 inline-block text-xs font-semibold text-[#b34e68] hover:underline"
              >
                Contact Support →
              </a>
            </div>
          </aside>

          {/* Main content */}
          <section className="min-w-0 space-y-6">
            {/* Welcome banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#f5d9d7] via-[#fbe9e5] to-[#f6e6dc] p-6 sm:p-8">
              <div className="relative z-10 max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a95868]">
                  Welcome back
                </p>
                <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  Hello, {profile?.name}!
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#826660]">
                  Your beauty journey starts here. Keep your details updated for
                  a more personal shopping experience.
                </p>
              </div>
              <div className="pointer-events-none absolute -right-8 -top-10 h-48 w-48 rounded-full border-[28px] border-white/25 sm:h-64 sm:w-64" />
              <div className="pointer-events-none absolute -bottom-20 right-20 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Total Orders",
                  value: "08",
                  icon: Package,
                  color: "bg-[#f9e8e4]",
                },
                {
                  label: "Wishlist Items",
                  value: "12",
                  icon: Heart,
                  color: "bg-[#f8e5ea]",
                },
                {
                  label: "Cart Items",
                  value: "02",
                  icon: ShoppingBag,
                  color: "bg-[#f7eddf]",
                },
              ].map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#f0e3df] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-[#95817a]">{stat.label}</p>
                        <p className="mt-2 text-3xl font-semibold">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`rounded-xl p-3 ${stat.color}`}>
                        <Icon size={22} className="text-[#b6536c]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Profile form */}
            {activeMenu === "My Profile" && (
              <div className="rounded-2xl border border-[#f0e3df] bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-[#95817a]">
                      Update your personal details below.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditing(!editing)}
                    className="flex shrink-0 items-center gap-2 rounded-lg border border-[#eed8d8] px-3 py-2 text-sm font-medium text-[#b6536c] transition hover:bg-[#fff5f5]"
                  >
                    <Pencil size={14} />
                    {editing ? "Cancel" : "Edit"}
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="First Name"
                      name="firstName"
                      value={profile?.name}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                    <Field
                      label="Last Name"
                      name="lastName"
                      value={profile?.name}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profile?.email}
                      onChange={handleChange}
                      disabled={!editing}
                      icon={<Mail size={16} />}
                    />
                    <Field
                      label="Phone Number"
                      name="phone"
                      //   value={profile?.phone}
                      onChange={handleChange}
                      disabled={!editing}
                      icon={<Phone size={16} />}
                    />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Gender
                      </label>
                      <select
                        name="gender"
                        // value={profile.gender}
                        onChange={handleChange}
                        disabled={!editing}
                        className="w-full rounded-xl border border-[#eee2df] bg-[#fdfaf9] px-4 py-3 text-sm outline-none transition focus:border-[#c46b7e] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>

                    <Field
                      label="Date of Birth"
                      name="birthday"
                      type="date"
                      //   value={profile.birthday}
                      onChange={handleChange}
                      disabled={!editing}
                      icon={<CalendarDays size={16} />}
                    />
                  </div>

                  {editing && (
                    <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-[#f1e8e5] pt-6">
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="rounded-xl border border-[#eadbd7] px-5 py-3 text-sm font-medium transition hover:bg-[#fcf5f3]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-xl bg-[#b95670] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#98445a]"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Other menu content */}
            {activeMenu !== "My Profile" && (
              <div className="rounded-2xl border border-[#f0e3df] bg-white px-6 py-12 text-center shadow-sm sm:px-10">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fae9e9] text-[#b6536c]">
                  {(() => {
                    const item = menuItems.find(
                      (menu) => menu.name === activeMenu,
                    );
                    const Icon = item?.icon || UserRound;
                    return <Icon size={28} />;
                  })()}
                </div>
                <h2 className="text-xl font-semibold">{activeMenu}</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#95817a]">
                  Your {activeMenu.toLowerCase()} information will appear here.
                  Connect this section to your store data to display your
                  personal shopping details.
                </p>
              </div>
            )}

            {/* Recent orders */}
            <div className="rounded-2xl border border-[#f0e3df] bg-white p-5 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Recent Orders</h2>
                  <p className="mt-1 text-sm text-[#95817a]">
                    Keep track of your latest purchases.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMenu("My Orders")}
                  className="shrink-0 text-sm font-semibold text-[#b6536c] hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <OrderListCard orderData={orderDeta} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  disabled,
  type = "text",
  icon,
}: {
  label: string;
  name: string;
  value?: string;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a58d86]">
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full rounded-xl border border-[#eee2df] bg-[#fdfaf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#b7a49e] focus:border-[#c46b7e] focus:ring-2 focus:ring-[#c46b7e]/10 disabled:cursor-not-allowed disabled:opacity-70 ${
            icon ? "pl-11" : ""
          }`}
        />
      </div>
    </div>
  );
}

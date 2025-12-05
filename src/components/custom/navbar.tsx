"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, Camera, TrendingUp, Utensils, User, LogOut, Menu, X, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, signOut } from "@/lib/supabase-auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (pathname === "/auth") return null;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              BodyVision Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isDashboard && isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/dashboard" icon={Activity} active={pathname === "/dashboard"}>
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/body-analysis" icon={Camera} active={pathname === "/dashboard/body-analysis"}>
                Análise Corporal
              </NavLink>
              <NavLink href="/dashboard/meal-analysis" icon={Utensils} active={pathname === "/dashboard/meal-analysis"}>
                Refeições
              </NavLink>
              <NavLink href="/dashboard/plan" icon={Activity} active={pathname === "/dashboard/plan"}>
                Meu Plano
              </NavLink>
              <NavLink href="/dashboard/progress" icon={TrendingUp} active={pathname === "/dashboard/progress"}>
                Evolução
              </NavLink>
              <Link href="/profile" className="ml-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Planos
              </Link>
              <Link href="/auth" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Entrar
              </Link>
              <Link
                href="/auth"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Começar Grátis
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {isDashboard && isAuthenticated ? (
              <>
                <MobileNavLink href="/dashboard" icon={Activity}>Dashboard</MobileNavLink>
                <MobileNavLink href="/dashboard/body-analysis" icon={Camera}>Análise Corporal</MobileNavLink>
                <MobileNavLink href="/dashboard/meal-analysis" icon={Utensils}>Refeições</MobileNavLink>
                <MobileNavLink href="/dashboard/plan" icon={Activity}>Meu Plano</MobileNavLink>
                <MobileNavLink href="/dashboard/progress" icon={TrendingUp}>Evolução</MobileNavLink>
                <div className="pt-3 border-t border-gray-200 mt-3 space-y-1">
                  <MobileNavLink href="/profile" icon={User}>Perfil</MobileNavLink>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sair</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/pricing" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  Planos
                </Link>
                <Link href="/auth" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  Entrar
                </Link>
                <Link
                  href="/auth"
                  className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center rounded-lg font-semibold"
                >
                  Começar Grátis
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ href, icon: Icon, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

function MobileNavLink({ href, icon: Icon, children }: MobileNavLinkProps) {
  return (
    <Link href={href} className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
      <Icon className="w-5 h-5" />
      <span className="font-medium">{children}</span>
    </Link>
  );
}

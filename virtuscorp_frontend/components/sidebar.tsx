"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BarChart2,
  LineChart,
  PieChart,
  FileText,
  Download,
  Settings,
  Sliders,
  Boxes,
  Database,
  BarChart,
  Filter,
  Eye,
  FileDigit,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

type MenuItem = {
  title: string
  path?: string
  icon: React.ReactNode
  submenu?: MenuItem[]
  expanded?: boolean
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
    router.refresh()
  }

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      expanded: false,
      submenu: [
        {
          title: "Метрики",
          path: "/dashboard/metrics",
          icon: <BarChart2 size={18} />,
        }
      ]
    },
  
    {
      title: "Аналитика",
      icon: <LineChart size={18} />,
      expanded: false,
      submenu: [
        {
          title: "Графики",
          path: "/analytics/charts",
          icon: <PieChart size={18} />,
        },
      ],
    },
    {
      title: "Отчеты",
      icon: <FileText size={18} />,
      expanded: false,
      submenu: [
        {
          title: "Экспорт",
          path: "/reports/export",
          icon: <Download size={18} />,
        },
      ],
    },
    {
      title: "Настройки",
      icon: <Settings size={18} />,
      expanded: false,
      submenu: [
        {
          title: "Настройки приложения",
          path: "/settings/app",
          icon: <Sliders size={18} />,
        },
      ],
    },
    {
      title: "Интеграции",
      icon: <Boxes size={18} />,
      expanded: false,
      submenu: [
        {
          title: "Источники данных",
          path: "/integrations/data-sources",
          icon: <Database size={18} />,
        },
      ],
    },
    {
      title: "Детальная аналитика",
      icon: <BarChart size={18} />,
      expanded: false,
      submenu: [
        {
          title: "Фильтры",
          path: "/detailed-analytics/filters",
          icon: <Filter size={18} />,
        },
      ],
    },
    {
      title: "Просмотр отчетов",
      icon: <Eye size={18} />,
      expanded: false,
      submenu: [
        {
          title: "Сформированные отчеты",
          path: "/view-report/generated",
          icon: <FileDigit size={18} />,
        },
      ],
    },
  ])

  const toggleSubmenu = (index: number) => {
    const updatedMenuItems = [...menuItems]
    updatedMenuItems[index].expanded = !updatedMenuItems[index].expanded
    setMenuItems(updatedMenuItems)
  }

  const isActive = (path?: string) => {
    if (!path) return false
    return pathname === path || pathname.startsWith(path + "/")
  }

  return (
    <aside className="w-64 min-h-screen bg-[#f0f0f6] text-[#0c1442] shadow-md flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#0c1442] text-white flex items-center justify-center font-bold mr-2">
          <span>VC</span>
        </div>
        <h1 className="text-xl font-bold">Virtus Corp</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={item.title}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className={cn(
                      "flex items-center w-full p-2 rounded-md hover:bg-gray-200 transition-colors",
                      isActive(item.path) && "bg-gray-200 font-medium",
                    )}
                  >
                    <span className="mr-3 text-[#0c1442]">{item.icon}</span>
                    <span className="flex-1 text-sm">{item.title}</span>
                    <span className="ml-auto">
                      {item.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  </button>

                  {item.expanded && item.submenu && (
                    <ul className="pl-10 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.path || "#"}
                            className={cn(
                              "flex items-center p-2 rounded-md hover:bg-gray-200 transition-colors text-sm",
                              isActive(subItem.path) && "bg-gray-200 font-medium",
                            )}
                          >
                            <span className="mr-3 text-[#0c1442]">{subItem.icon}</span>
                            <span>{subItem.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path || "#"}
                  className={cn(
                    "flex items-center p-2 rounded-md hover:bg-gray-200 transition-colors",
                    isActive(item.path) && "bg-gray-200 font-medium",
                  )}
                >
                  <span className="mr-3 text-[#0c1442]">{item.icon}</span>
                  <span className="text-sm">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-md hover:bg-gray-200 transition-colors #0c1442 hover:text-gray-700"
        >
          <span className="mr-3">
            <LogOut size={18} />
          </span>
          <span className="text-sm font-medium">Выйти</span>
        </button>
      </div>
    </aside>
  )
}


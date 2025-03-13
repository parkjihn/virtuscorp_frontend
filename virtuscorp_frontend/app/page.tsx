import type React from "react"
import Sidebar from "@/components/sidebar"

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-row min-h-screen bg-[#F5F7FA]">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <header className="w-full py-4 bg-[#ffff] shadow-md flex justify-between px-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard</h1>
          <nav></nav>
        </header>

        <div className="flex flex-col flex-1 bg-[#F5F7FA]">
      <main className="flex-1 p-8">
     

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#f0f0ff] p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#0c1442]">Продажи</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600">Объем продаж (Revenue):</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Количество заказов:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Средний чек (AOV):</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Конверсия (Conversion Rate):</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">GMV (Gross Merchandise Volume):</span>
              </div>
            </div>
          </div>


          <div className="bg-[#f0f0ff] p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#0c1442]">Ассортимент</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600">Количество SKU (Stock Keeping Units):</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Активные SKU:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">SKU с нулевым спросом:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Популярность SKU:</span>
              </div>
            </div>
          </div>

  
          <div className="bg-[#f0f0ff] p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#0c1442]">Ценообразование</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600">Средняя цена товара:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Маржинальность:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Динамика цен:</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f0ff] p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#0c1442]">Логистика</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600">Время доставки:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Заказы в пути:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Возвраты:</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f0ff] p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#0c1442]">Клиентская база</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600">Повторные покупки:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Отзывы и рейтинги:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">NPS (Net Promoter Score):</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f0ff] p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#0c1442]">Специфические метрики для каждого маркетплейса</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-600">Ozon Premium:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Wildberries:</span>
              </div>
              <div className="flex">
                <span className="text-gray-600">Yandex Campaign ROI:</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

        <footer className="w-full py-4 bg-[#f0f0f6] shadow-md text-center">
          <p className="text-gray-600">&copy; 2025 Virtus Corp. Все права защищены.</p>
        </footer>
      </div>
    </div>
  )
}

export default HomePage


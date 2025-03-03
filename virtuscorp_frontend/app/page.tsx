import React from "react";
import Link from "next/link";


const HomePage: React.FC = () => {

  return (
    <div className="flex flex-row min-h-screen bg-[#F5F7FA]">

      <aside className="w-64 bg-[#1E293B] text-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Меню</h2>
        <nav>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="hover:text-gray-300"> Панель управления</Link></li>
            <li><Link href="/analytics" className="hover:text-gray-300"> Аналитика</Link></li>
            <li><Link href="/reports" className="hover:text-gray-300"> Отчёты</Link></li>
            <li><Link href="/settings" className="hover:text-gray-300"> Настройки</Link></li>
            <li><Link href="/help" className="hover:text-gray-300"> Помощь</Link></li>
          </ul>
        </nav>
      </aside>
      
      <div className="flex flex-col flex-1">
        <header className="w-full py-4 bg-white shadow-md flex justify-between px-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">Virtus Corp</h1>
          <nav>
           
          </nav>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-4xl font-semibold mb-4 text-[#1E293B]">Добро пожаловать в Virtus Corp</h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            Мы предоставляем передовые аналитические решения для вашего бизнеса.
          </p>
          <Link href="/dashboard">
            <button className="mt-6 px-6 py-3 bg-[#2563EB] text-white rounded-md hover:bg-[#1D4ED8]">
              Начать работу
            </button>
          </Link>
        </main>

        <footer className="w-full py-4 bg-white shadow-md text-center">
          <p className="text-gray-600">&copy; 2025 Virtus Corp. Все права защищены.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;

export default function Dashboard() {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Панель управления</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Статистика</h2>
            <p className="text-gray-600">Здесь будет отображаться статистика.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Задачи</h2>
            <p className="text-gray-600">Здесь будут отображаться ваши задачи.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Уведомления</h2>
            <p className="text-gray-600">Здесь будут отображаться уведомления.</p>
          </div>
        </div>
      </div>
    )
  }
  
  
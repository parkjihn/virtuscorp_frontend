export default function Profile() {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Профиль пользователя</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-blue-800 text-white flex items-center justify-center text-4xl font-bold">
                ПИ
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-2">Пользователь Иванов</h2>
              <p className="text-gray-600 mb-4">user@example.com</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Личная информация</h3>
                  <p className="text-gray-600">Должность: Менеджер</p>
                  <p className="text-gray-600">Отдел: Маркетинг</p>
                  <p className="text-gray-600">Телефон: +7 (999) 123-45-67</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Настройки аккаунта</h3>
                  <button className="text-blue-800 hover:underline">Изменить пароль</button>
                  <p className="text-gray-600 mt-2">Последний вход: 01.03.2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  
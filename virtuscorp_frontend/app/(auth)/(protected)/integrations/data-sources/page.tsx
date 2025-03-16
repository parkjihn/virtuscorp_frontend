import { Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DataSourcesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#0c1442] mb-2">Источники данных</h1>
      <p className="text-gray-600 mb-6">Управление и настройка внешних подключений данных.</p>

      <div className="bg-white rounded-lg border p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Подключенные источники данных</h2>

          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#0c1442] mb-2">OZON</h3>
            <p className="text-gray-600 mb-4">Статус: Активен</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Input 
                  type="password" 
                  value="****************" 
                  className="pr-10" 
                  readOnly
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Input 
                  type="password" 
                  value="****************" 
                  className="pr-10" 
                  readOnly
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex space-x-4">
                <Button className="bg-[#0c1442]">Добавить API-ключи</Button>
                <Button variant="outline" className="border-[#0c1442] text-[#0c1442]">Проверить</Button>
              </div>
            </div>
          </div>

          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#0c1442] mb-2">Wildberries</h3>
            <p className="text-gray-600 mb-4">Статус: Активен</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Input 
                  type="password" 
                  value="****************" 
                  className="pr-10" 
                  readOnly
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Input 
                  type="password" 
                  value="****************" 
                  className="pr-10" 
                  readOnly
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex space-x-4">
                <Button className="bg-[#0c1442]">Добавить API-ключи</Button>
                <Button variant="outline" className="border-[#0c1442] text-[#0c1442]">Проверить</Button>
              </div>
            </div>
          </div>

          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#0c1442] mb-2">Яндекс Маркет</h3>
            <p className="text-gray-600 mb-4">Статус: Активен</p>
            
            <div className="space-y-4">
              <div className="relative">
                <Input 
                  type="password" 
                  value="****************" 
                  className="pr-10" 
                  readOnly
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Input 
                  type="password" 
                  value="****************" 
                  className="pr-10" 
                  readOnly
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex space-x-4">
                <Button className="bg-[#0c1442]">Добавить API-ключи</Button>
                <Button variant="outline" className="border-[#0c1442] text-[#0c1442]">Проверить</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

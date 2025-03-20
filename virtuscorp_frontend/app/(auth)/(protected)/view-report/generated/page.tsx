import { CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GeneratedReportsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-[#0c1442] mb-6">Сформированные отчеты</h1>

      <Card className="p-6">
        <p className="text-gray-600 mb-4">Получите доступ и управляйте всеми вашими отчетами в одном месте.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Input
              placeholder="Поиск по названию, типу или дате"
              className="w-full"
            />
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Тип отчета" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">Финансовая сводка</SelectItem>
                <SelectItem value="sales">Отчет по продажам</SelectItem>
                <SelectItem value="tax">Налоговая отчетность</SelectItem>
                <SelectItem value="inventory">Отчет по инвентарю</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Дата создания" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Сначала новые</SelectItem>
                <SelectItem value="oldest">Сначала старые</SelectItem>
                <SelectItem value="last-week">За последнюю неделю</SelectItem>
                <SelectItem value="last-month">За последний месяц</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Завершен</SelectItem>
                <SelectItem value="in-progress">В процессе</SelectItem>
                <SelectItem value="failed">Ошибка</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {/* Report 1 */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Финансовая сводка Q4</h3>
                <p className="text-sm text-gray-500">Создан: 2023-10-01 14:30</p>
                <p className="text-sm text-gray-500">Тип: Финансовая сводка</p>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Статус: Завершен</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <Button className="bg-[#0c1442]">Просмотр отчета</Button>
                <Button variant="outline">Скачать</Button>
                <Button variant="outline">Поделиться</Button>
              </div>
            </div>
          </Card>

        
          <Card className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Отчет по продажам - Октябрь</h3>
                <p className="text-sm text-gray-500">Создан: 2023-10-10 09:15</p>
                <p className="text-sm text-gray-500">Тип: Отчет по продажам</p>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm">Статус: В процессе</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <Button className="bg-[#0c1442]" disabled>
                  Просмотр отчета
                </Button>
                <Button variant="outline" disabled>
                  Скачать
                </Button>
                <Button variant="outline" disabled>
                  Поделиться
                </Button>
              </div>
            </div>
          </Card>

          {/* Report 3 */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Годовая налоговая отчетность</h3>
                <p className="text-sm text-gray-500">Создан: 2023-09-15 11:45</p>
                <p className="text-sm text-gray-500">Тип: Налоговая отчетность</p>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm">Статус: Ошибка</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <Button className="bg-[#0c1442]">Просмотр отчета</Button>
                <Button variant="outline">Скачать</Button>
                <Button variant="outline">Поделиться</Button>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}


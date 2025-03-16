import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExportPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-4xl font-bold text-[#0c1442] mb-2">Экспорт отчетов</h1>
          <p className="text-gray-600 mb-8">Создавайте и настраивайте отчеты для ваших бизнес-потребностей.</p>

          <div className="space-y-8">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Шаг 1: Выберите тип отчета</h2>
              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Финансовая сводка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Финансовая сводка</SelectItem>
                    <SelectItem value="sales">Отчет по продажам</SelectItem>
                    <SelectItem value="inventory">Отчет по инвентарю</SelectItem>
                    <SelectItem value="marketing">Маркетинговая аналитика</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="combine" />
                <Label htmlFor="combine">Объединить несколько отчетов в один файл</Label>
              </div>
            </div>

            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Шаг 2: Настройте данные</h2>

              <div className="space-y-2">
                <Label htmlFor="date-range">Выбор диапазона дат</Label>
                <Input id="date-range" placeholder="ДД-ММ-ГГГГ" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="filters">Фильтры</Label>
                <Input id="filters" placeholder="например, регионы, продукты" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="exclude-taxes" />
                  <Label htmlFor="exclude-taxes">Исключить налоги</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-profit" />
                  <Label htmlFor="show-profit">Показать маржу прибыли</Label>
                </div>
              </div>
            </div>

            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Шаг 3: Выберите формат экспорта</h2>
              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="PDF" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Шаг 4: Настройки экспорта</h2>

              <div className="space-y-2">
                <Label htmlFor="file-naming">Соглашение об именовании файлов</Label>
                <Input id="file-naming" placeholder="По умолчанию: Тип_Отчета_Дата" />
              </div>

              <div className="space-y-2">
                <Label>Варианты назначения</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="download" />
                  <Label htmlFor="download">Скачать на устройство</Label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full md:w-auto">Создать отчет</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


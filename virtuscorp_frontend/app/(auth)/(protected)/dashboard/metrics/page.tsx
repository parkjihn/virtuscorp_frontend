"use client"

import type React from "react"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export default function MetricsPage() {
  const [salesMetrics, setSalesMetrics] = useState({
    salesVolume: true,
    orderCount: true,
    averageCheck: true,
    conversion: true,
    gmv: true,
  })

  const [assortmentMetrics, setAssortmentMetrics] = useState({
    skuCount: true,
    activeSkus: true,
    zeroSalesSkus: true,
    skuPopularity: true,
  })

  const [pricingMetrics, setPricingMetrics] = useState({
    averagePrice: true,
    marginality: true,
    priceDynamics: true,
  })

  const [logisticsMetrics, setLogisticsMetrics] = useState({
    deliveryTime: true,
    ordersInTransit: true,
    returns: true,
  })

  const [customerMetrics, setCustomerMetrics] = useState({
    repeatPurchases: true,
    reviewsRatings: true,
    nps: true,
  })

  const [ozonMetrics, setOzonMetrics] = useState({
    fbsOzonRocket: true,
    ozonPremium: true,
    ozonAds: true,
    ozonCashback: true,
  })

  const [wildberriesMetrics, setWildberriesMetrics] = useState({
    visibility: true,
    fines: true,
    commissions: true,
    wbPremium: true,
  })

  const [yandexMetrics, setYandexMetrics] = useState({
    dbsFbs: true,
    yandexPlus: true,
    yandexAds: true,
    categorization: true,
  })

  const handleToggle = (section: string): void => {
    switch (section) {
      case "sales":
        setSalesMetrics({ ...salesMetrics, })
        break
      case "assortment":
        setAssortmentMetrics({ ...assortmentMetrics})
        break
      case "pricing":
        setPricingMetrics({ ...pricingMetrics})
        break
      case "logistics":
        setLogisticsMetrics({ ...logisticsMetrics})
        break
      case "customer":
        setCustomerMetrics({ ...customerMetrics})
        break
      case "ozon":
        setOzonMetrics({ ...ozonMetrics })
        break
      case "wildberries":
        setWildberriesMetrics({ ...wildberriesMetrics})
        break
      case "yandex":
        setYandexMetrics({ ...yandexMetrics,  })
        break
    }
  }

  interface MetricItemProps {
    section: string
    metric: string
    label: string
    checked: boolean
  }   

  const MetricItem = ({ section,label, checked }: MetricItemProps) => (
    <div className="flex justify-between items-center py-2">
      <span>{label}</span>
      <Switch checked={checked} onCheckedChange={() => handleToggle(section)} />
    </div>
  )

  interface MetricsSectionProps {
    title: string
    className?: string
    children: React.ReactNode
  }

  const MetricsSection = ({ title, className, children }: MetricsSectionProps) => (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Основные метрики для всех маркетплейсов</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricsSection title="Продажи" className="bg-[#f0f0ff] rounded-lg">
          <MetricItem section="sales" metric="salesVolume" label="Объем продаж" checked={salesMetrics.salesVolume} />
          <MetricItem
            section="sales"
            metric="orderCount"
            label="Количество заказов"
            checked={salesMetrics.orderCount}
          />
          <MetricItem
            section="sales"
            metric="averageCheck"
            label="Средний чек (AOV)"
            checked={salesMetrics.averageCheck}
          />
          <MetricItem section="sales" metric="conversion" label="Конверсия" checked={salesMetrics.conversion} />
          <MetricItem section="sales" metric="gmv" label="GMV" checked={salesMetrics.gmv} />
        </MetricsSection>

        <MetricsSection title="Ассортимент" className="bg-[#f0f0ff] rounded-lg">
          <MetricItem
            section="assortment"
            metric="skuCount"
            label="Количество SKU"
            checked={assortmentMetrics.skuCount}
          />
          <MetricItem
            section="assortment"
            metric="activeSkus"
            label="Активные SKU"
            checked={assortmentMetrics.activeSkus}
          />
          <MetricItem
            section="assortment"
            metric="zeroSalesSkus"
            label="SKU с нулевым спросом"
            checked={assortmentMetrics.zeroSalesSkus}
          />
          <MetricItem
            section="assortment"
            metric="skuPopularity"
            label="Популярность SKU"
            checked={assortmentMetrics.skuPopularity}
          />
        </MetricsSection>

        <MetricsSection title="Ценообразование" className="bg-[#f0f0ff] rounded-lg">
          <MetricItem
            section="pricing"
            metric="averagePrice"
            label="Средняя цена товара"
            checked={pricingMetrics.averagePrice}
          />
          <MetricItem
            section="pricing"
            metric="marginality"
            label="Маржинальность"
            checked={pricingMetrics.marginality}
          />
          <MetricItem
            section="pricing"
            metric="priceDynamics"
            label="Динамика цен"
            checked={pricingMetrics.priceDynamics}
          />
        </MetricsSection>
      </div>

      <h1 className="text-2xl font-bold mb-6">Логистика</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MetricsSection title="Логистика" className="bg-[#f0f0ff] rounded-lg">
          <MetricItem
            section="logistics"
            metric="deliveryTime"
            label="Время доставки"
            checked={logisticsMetrics.deliveryTime}
          />
          <MetricItem
            section="logistics"
            metric="ordersInTransit"
            label="Заказы в пути"
            checked={logisticsMetrics.ordersInTransit}
          />
          <MetricItem section="logistics" metric="returns" label="Возвраты" checked={logisticsMetrics.returns} />
        </MetricsSection>

        <MetricsSection title="Клиентская база" className="bg-[#f0f0ff] rounded-lg">
          <MetricItem
            section="customer"
            metric="repeatPurchases"
            label="Повторные покупки"
            checked={customerMetrics.repeatPurchases}
          />
          <MetricItem
            section="customer"
            metric="reviewsRatings"
            label="Отзывы и рейтинги"
            checked={customerMetrics.reviewsRatings}
          />
          <MetricItem section="customer" metric="nps" label="NPS" checked={customerMetrics.nps} />
        </MetricsSection>
      </div>

      <h1 className="text-2xl font-bold mb-6">Специфические метрики</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricsSection title="Ozon" className="bg-[#f0f0ff] rounded-lg">
          <MetricItem
            section="ozon"
            metric="fbsOzonRocket"
            label="FBS/Ozon Rocket"
            checked={ozonMetrics.fbsOzonRocket}
          />
          <MetricItem section="ozon" metric="ozonPremium" label="Ozon Premium" checked={ozonMetrics.ozonPremium} />
          <MetricItem section="ozon" metric="ozonAds" label="Рекламные кампании" checked={ozonMetrics.ozonAds} />
          <MetricItem section="ozon" metric="ozonCashback" label="Кэшбэк Ozon" checked={ozonMetrics.ozonCashback} />
        </MetricsSection>

        <MetricsSection title="Wildberries" className="bg-[#f0f0ff] rounded-lg">
          <MetricItem
            section="wildberries"
            metric="visibility"
            label="Выкупаемость"
            checked={wildberriesMetrics.visibility}
          />
          <MetricItem section="wildberries" metric="fines" label="Штрафы" checked={wildberriesMetrics.fines} />
          <MetricItem
            section="wildberries"
            metric="commissions"
            label="Комиссии"
            checked={wildberriesMetrics.commissions}
          />
          <MetricItem
            section="wildberries"
            metric="wbPremium"
            label="WB Premium"
            checked={wildberriesMetrics.wbPremium}
          />
        </MetricsSection>

        <MetricsSection title="Yandex Market" className="bg-[#f0f0ff] rounded-lg">
          <MetricItem section="yandex" metric="dbsFbs" label="DBS/FBS" checked={yandexMetrics.dbsFbs} />
          <MetricItem section="yandex" metric="yandexPlus" label="Яндекс Бонус" checked={yandexMetrics.yandexPlus} />
          <MetricItem
            section="yandex"
            metric="yandexAds"
            label="Рекламные кампании"
            checked={yandexMetrics.yandexAds}
          />
          <MetricItem
            section="yandex"
            metric="categorization"
            label="Категоризация"
            checked={yandexMetrics.categorization}
          />
        </MetricsSection>
      </div>
    </div>
  )
}
  

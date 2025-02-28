#!/bin/bash

# Set error handling
set -e

# Base directory
BASE_DIR="."

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to create file and show status
create_file() {
    if [ ! -f "$1" ]; then
        if touch "$1"; then
            echo -e "${GREEN}Created file:${NC} $1"
        else
            echo -e "${RED}Failed to create file:${NC} $1"
            exit 1
        fi
    else
        echo -e "File already exists: $1"
    fi
}

echo "Creating empty files for Virtus Corp Financial Metrics app..."

# Auth pages
create_file "$BASE_DIR/app/(auth)/login/page.tsx"
create_file "$BASE_DIR/app/(auth)/register/page.tsx"

# Dashboard pages
create_file "$BASE_DIR/app/dashboard/analytics/page.tsx"
create_file "$BASE_DIR/app/dashboard/analytics/loading.tsx"
create_file "$BASE_DIR/app/dashboard/forecasts/page.tsx"
create_file "$BASE_DIR/app/dashboard/forecasts/loading.tsx"
create_file "$BASE_DIR/app/dashboard/forecasts/[id]/page.tsx"
create_file "$BASE_DIR/app/dashboard/metrics/page.tsx"
create_file "$BASE_DIR/app/dashboard/metrics/loading.tsx"
create_file "$BASE_DIR/app/dashboard/metrics/categories/page.tsx"
create_file "$BASE_DIR/app/dashboard/metrics/comparison/page.tsx"
create_file "$BASE_DIR/app/dashboard/reports/page.tsx"
create_file "$BASE_DIR/app/dashboard/reports/loading.tsx"
create_file "$BASE_DIR/app/dashboard/reports/[id]/page.tsx"
create_file "$BASE_DIR/app/dashboard/reports/generate/page.tsx"
create_file "$BASE_DIR/app/dashboard/settings/page.tsx"
create_file "$BASE_DIR/app/dashboard/settings/account/page.tsx"
create_file "$BASE_DIR/app/dashboard/settings/notifications/page.tsx"

# API routes
create_file "$BASE_DIR/app/api/auth/[...nextauth]/route.ts"
create_file "$BASE_DIR/app/api/charts/metrics/route.ts"
create_file "$BASE_DIR/app/api/charts/forecasts/route.ts"
create_file "$BASE_DIR/app/api/charts/reports/route.ts"
create_file "$BASE_DIR/app/api/webhook/route.ts"

# Auth components
create_file "$BASE_DIR/components/auth/login-form.tsx"
create_file "$BASE_DIR/components/auth/register-form.tsx"
create_file "$BASE_DIR/components/auth/auth-form.tsx"

# Chart components
create_file "$BASE_DIR/components/charts/area/revenue-chart.tsx"
create_file "$BASE_DIR/components/charts/area/profit-chart.tsx"
create_file "$BASE_DIR/components/charts/area/growth-chart.tsx"
create_file "$BASE_DIR/components/charts/bar/expenses-chart.tsx"
create_file "$BASE_DIR/components/charts/bar/comparison-chart.tsx"
create_file "$BASE_DIR/components/charts/bar/metrics-chart.tsx"
create_file "$BASE_DIR/components/charts/line/trend-chart.tsx"
create_file "$BASE_DIR/components/charts/line/forecast-chart.tsx"
create_file "$BASE_DIR/components/charts/line/performance-chart.tsx"
create_file "$BASE_DIR/components/charts/pie/distribution-chart.tsx"
create_file "$BASE_DIR/components/charts/pie/allocation-chart.tsx"
create_file "$BASE_DIR/components/charts/pie/breakdown-chart.tsx"
create_file "$BASE_DIR/components/charts/combined/revenue-expenses-chart.tsx"
create_file "$BASE_DIR/components/charts/combined/metrics-comparison-chart.tsx"
create_file "$BASE_DIR/components/charts/combined/performance-analysis-chart.tsx"
create_file "$BASE_DIR/components/charts/common/chart-container.tsx"
create_file "$BASE_DIR/components/charts/common/chart-header.tsx"
create_file "$BASE_DIR/components/charts/common/chart-legend.tsx"
create_file "$BASE_DIR/components/charts/common/chart-tooltip.tsx"
create_file "$BASE_DIR/components/charts/common/chart-controls.tsx"
create_file "$BASE_DIR/components/charts/utils/chart-themes.ts"
create_file "$BASE_DIR/components/charts/utils/formatters.ts"
create_file "$BASE_DIR/components/charts/utils/generators.ts"

# Dashboard components
create_file "$BASE_DIR/components/dashboard/cards/metric-card.tsx"
create_file "$BASE_DIR/components/dashboard/cards/summary-card.tsx"
create_file "$BASE_DIR/components/dashboard/cards/trend-card.tsx"
create_file "$BASE_DIR/components/dashboard/forms/filter-form.tsx"
create_file "$BASE_DIR/components/dashboard/forms/report-form.tsx"
create_file "$BASE_DIR/components/dashboard/forms/settings-form.tsx"
create_file "$BASE_DIR/components/dashboard/tables/metrics-table.tsx"
create_file "$BASE_DIR/components/dashboard/tables/reports-table.tsx"
create_file "$BASE_DIR/components/dashboard/tables/transactions-table.tsx"
create_file "$BASE_DIR/components/dashboard/header.tsx"
create_file "$BASE_DIR/components/dashboard/nav.tsx"
create_file "$BASE_DIR/components/dashboard/overview-metrics.tsx"
create_file "$BASE_DIR/components/dashboard/recent-transactions.tsx"
create_file "$BASE_DIR/components/dashboard/shell.tsx"
create_file "$BASE_DIR/components/dashboard/user-nav.tsx"

# UI components
create_file "$BASE_DIR/components/ui/avatar.tsx"
create_file "$BASE_DIR/components/ui/button.tsx"
create_file "$BASE_DIR/components/ui/card.tsx"
create_file "$BASE_DIR/components/ui/dialog.tsx"
create_file "$BASE_DIR/components/ui/dropdown-menu.tsx"
create_file "$BASE_DIR/components/ui/form.tsx"
create_file "$BASE_DIR/components/ui/input.tsx"
create_file "$BASE_DIR/components/ui/select.tsx"
create_file "$BASE_DIR/components/ui/table.tsx"
create_file "$BASE_DIR/components/ui/tabs.tsx"
create_file "$BASE_DIR/components/ui/toast.tsx"
create_file "$BASE_DIR/components/ui/toaster.tsx"
create_file "$BASE_DIR/components/ui/use-toast.ts"

# Root components
create_file "$BASE_DIR/components/auth-provider.tsx"
create_file "$BASE_DIR/components/mode-toggle.tsx"
create_file "$BASE_DIR/components/theme-provider.tsx"

# Config files
create_file "$BASE_DIR/config/charts.ts"
create_file "$BASE_DIR/config/dashboard.ts"
create_file "$BASE_DIR/config/navigation.ts"
create_file "$BASE_DIR/config/site.ts"

# Hooks
create_file "$BASE_DIR/hooks/charts/use-chart-data.ts"
create_file "$BASE_DIR/hooks/charts/use-chart-dimensions.ts"
create_file "$BASE_DIR/hooks/charts/use-chart-animation.ts"
create_file "$BASE_DIR/hooks/charts/use-chart-zoom.ts"
create_file "$BASE_DIR/hooks/charts/use-chart-export.ts"
create_file "$BASE_DIR/hooks/use-debounce.ts"

# API lib files
create_file "$BASE_DIR/lib/api/charts/fetch-chart-data.ts"
create_file "$BASE_DIR/lib/api/charts/process-chart-data.ts"
create_file "$BASE_DIR/lib/api/charts/cache-chart-data.ts"
create_file "$BASE_DIR/lib/api/metrics/metrics-api.ts"
create_file "$BASE_DIR/lib/api/reports/reports-api.ts"

# Chart lib files
create_file "$BASE_DIR/lib/charts/adapters/recharts-adapter.ts"
create_file "$BASE_DIR/lib/charts/adapters/d3-adapter.ts"
create_file "$BASE_DIR/lib/charts/transformers/financial-data-transformer.ts"
create_file "$BASE_DIR/lib/charts/transformers/metrics-transformer.ts"
create_file "$BASE_DIR/lib/charts/transformers/time-series-transformer.ts"
create_file "$BASE_DIR/lib/charts/constants/chart-colors.ts"
create_file "$BASE_DIR/lib/charts/constants/chart-config.ts"
create_file "$BASE_DIR/lib/charts/constants/chart-defaults.ts"

# Root lib files
create_file "$BASE_DIR/lib/auth.ts"
create_file "$BASE_DIR/lib/db.ts"
create_file "$BASE_DIR/lib/utils.ts"

# Styles
create_file "$BASE_DIR/styles/charts/area.css"
create_file "$BASE_DIR/styles/charts/bar.css"
create_file "$BASE_DIR/styles/charts/line.css"
create_file "$BASE_DIR/styles/charts/pie.css"

# Types
create_file "$BASE_DIR/types/api/metrics.d.ts"
create_file "$BASE_DIR/types/api/reports.d.ts"
create_file "$BASE_DIR/types/charts/chart-data.d.ts"
create_file "$BASE_DIR/types/charts/chart-options.d.ts"
create_file "$BASE_DIR/types/charts/chart-config.d.ts"
create_file "$BASE_DIR/types/auth.d.ts"
create_file "$BASE_DIR/types/next-auth.d.ts"

echo -e "${GREEN}Empty files created successfully!${NC}"
echo "Structure is ready for development."

exit 0
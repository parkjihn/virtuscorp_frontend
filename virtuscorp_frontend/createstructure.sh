#!/bin/bash

# Set error handling
set -e

# Base directory (текущая директория, так как приложение уже создано)
BASE_DIR="."

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to create directory and show status
create_dir() {
    if [ ! -d "$1" ]; then
        if mkdir -p "$1"; then
            echo -e "${GREEN}Created directory:${NC} $1"
        else
            echo -e "${RED}Failed to create directory:${NC} $1"
            exit 1
        fi
    else
        echo -e "Directory already exists: $1"
    fi
}

echo "Creating additional directory structure for Virtus Corp Financial Metrics app..."

# Create main app structure
create_dir "$BASE_DIR/app/(auth)/login"
create_dir "$BASE_DIR/app/(auth)/register"
create_dir "$BASE_DIR/app/dashboard/analytics"
create_dir "$BASE_DIR/app/dashboard/forecasts"
create_dir "$BASE_DIR/app/dashboard/forecasts/[id]"
create_dir "$BASE_DIR/app/dashboard/metrics/categories"
create_dir "$BASE_DIR/app/dashboard/metrics/comparison"
create_dir "$BASE_DIR/app/dashboard/reports/[id]"
create_dir "$BASE_DIR/app/dashboard/reports/generate"
create_dir "$BASE_DIR/app/dashboard/settings/account"
create_dir "$BASE_DIR/app/dashboard/settings/notifications"
create_dir "$BASE_DIR/app/api/auth/[...nextauth]"
create_dir "$BASE_DIR/app/api/charts/metrics"
create_dir "$BASE_DIR/app/api/charts/forecasts"
create_dir "$BASE_DIR/app/api/charts/reports"
create_dir "$BASE_DIR/app/api/webhook"

# Create components structure
create_dir "$BASE_DIR/components/auth"
create_dir "$BASE_DIR/components/charts/area"
create_dir "$BASE_DIR/components/charts/bar"
create_dir "$BASE_DIR/components/charts/line"
create_dir "$BASE_DIR/components/charts/pie"
create_dir "$BASE_DIR/components/charts/combined"
create_dir "$BASE_DIR/components/charts/common"
create_dir "$BASE_DIR/components/charts/utils"
create_dir "$BASE_DIR/components/dashboard/cards"
create_dir "$BASE_DIR/components/dashboard/forms"
create_dir "$BASE_DIR/components/dashboard/tables"
create_dir "$BASE_DIR/components/ui"

# Create configuration directories
create_dir "$BASE_DIR/config"

# Create hooks structure
create_dir "$BASE_DIR/hooks/charts"

# Create lib structure
create_dir "$BASE_DIR/lib/api/charts"
create_dir "$BASE_DIR/lib/api/metrics"
create_dir "$BASE_DIR/lib/api/reports"
create_dir "$BASE_DIR/lib/charts/adapters"
create_dir "$BASE_DIR/lib/charts/transformers"
create_dir "$BASE_DIR/lib/charts/constants"

# Create styles structure
create_dir "$BASE_DIR/styles/charts"

# Create types structure
create_dir "$BASE_DIR/types/api"
create_dir "$BASE_DIR/types/charts"

# Set permissions
chmod -R 755 "$BASE_DIR/app"
chmod -R 755 "$BASE_DIR/components"
chmod -R 755 "$BASE_DIR/config"
chmod -R 755 "$BASE_DIR/hooks"
chmod -R 755 "$BASE_DIR/lib"
chmod -R 755 "$BASE_DIR/styles"
chmod -R 755 "$BASE_DIR/types"

find "$BASE_DIR/app" -type f -exec chmod 644 {} \;
find "$BASE_DIR/components" -type f -exec chmod 644 {} \;
find "$BASE_DIR/config" -type f -exec chmod 644 {} \;
find "$BASE_DIR/hooks" -type f -exec chmod 644 {} \;
find "$BASE_DIR/lib" -type f -exec chmod 644 {} \;
find "$BASE_DIR/styles" -type f -exec chmod 644 {} \;
find "$BASE_DIR/types" -type f -exec chmod 644 {} \;

echo -e "${GREEN}Additional directory structure created successfully!${NC}"
echo "Structure is ready for development."

exit 0
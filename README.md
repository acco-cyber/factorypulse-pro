# Factory Pulse Pro

Smart Factory Health Dashboard - A comprehensive industrial monitoring platform for real-time factory operations analysis.

## Project Overview

Factory Pulse Pro provides real-time monitoring and analytics for industrial operations, featuring:

- **Live Metrics Dashboard** - Real-time monitoring of production KPIs
- **Alert Management** - Intelligent alerting system for operational issues
- **Maintenance Tracking** - Comprehensive maintenance logs and scheduling
- **AI Assistant** - Smart recommendations and insights
- **Role-Based Access** - Customized views for different user roles

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd factory-pulse-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui component library
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── AIAssistantPanel.tsx
│   ├── AlertsPanel.tsx
│   ├── LiveMetricsPanel.tsx
│   └── MaintenanceLogsTable.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Application pages/routes
└── main.tsx           # Application entry point
```

## Features

### Live Metrics
- Real-time production monitoring
- Equipment efficiency tracking
- Performance KPI visualization

### Alert System
- Automated alert generation
- Priority-based categorization
- Real-time notifications

### Maintenance Management
- Equipment maintenance logs
- Scheduled maintenance tracking
- Historical maintenance data

### AI Assistant
- Intelligent operational insights
- Predictive maintenance recommendations
- Performance optimization suggestions

## Development Guidelines

- Follow TypeScript best practices
- Use semantic commit messages
- Maintain component modularity
- Write comprehensive tests
- Follow accessibility standards

## Deployment

The application can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider

Popular deployment options:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
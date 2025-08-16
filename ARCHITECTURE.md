# Architecture Documentation

## 🏗️ System Architecture Overview

This document outlines the architectural decisions, patterns, and structure of the Structured Settlement CRM Platform.

## 📋 Table of Contents

1. [Component Architecture](#component-architecture)
2. [State Management](#state-management)
3. [Data Flow](#data-flow)
4. [File Organization](#file-organization)
5. [Design Patterns](#design-patterns)
6. [Integration Points](#integration-points)

## 🧩 Component Architecture

### **Hierarchical Component Structure**

```
RepDashboard
├── LeadManagement
│   ├── CampaignHeader
│   ├── LeadList
│   └── LeadFilters
├── ClientProfile
│   ├── LeftColumn
│   │   ├── ClientDetailsCard
│   │   └── PhoneManagementCard
│   ├── MiddleColumn
│   │   ├── AnnuityCard
│   │   ├── OfferCard
│   │   └── SettlementSummaryCard
│   ├── RightColumn
│   │   ├── ActivityLogCard
│   │   ├── MessageHistoryCard
│   │   └── CashAdvanceCard
│   ├── DocumentHub (Modal)
│   └── DealManagementHub (Modal)
└── ActionButtons
```

### **Component Design Principles**

#### **1. Single Responsibility**
Each component has one clear purpose:
- `ClientDetailsCard` - Only handles client personal information
- `ActivityLogCard` - Only manages activity history and new entries
- `DocumentHub` - Only handles document management

#### **2. Composition over Inheritance**
```typescript
// Good: Composition
<CollapsibleCard 
  title="Client Details" 
  isDisabled={!visibleSections.includes('clientProfile')}
>
  <ClientDetailsCard data={clientData} />
</CollapsibleCard>

// Avoided: Inheritance-based approach
```

#### **3. Props Interface Design**
```typescript
interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
  disabledMessage?: string;
  cardType?: string;
}
```

## 🔄 State Management

### **Custom Hooks Pattern**

#### **useClientProfileState Hook**
```typescript
export const useClientProfileState = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    clientProfile: false,
    attorney: false,
    // ... all sections
  });

  const [showDocumentHub, setShowDocumentHub] = useState(false);
  const [showDealManagementHub, setShowDealManagementHub] = useState(false);

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return {
    expandedSections,
    showDocumentHub,
    showDealManagementHub,
    toggleSection,
    setShowDocumentHub,
    setShowDealManagementHub,
    expandAll,
    collapseAll
  };
};
```

### **State Architecture Benefits**
- **Centralized**: All related state in one place
- **Type Safe**: TypeScript ensures state consistency
- **Reusable**: Hook can be used across components
- **Testable**: Easy to unit test state logic

## 📊 Data Flow

### **Data Flow Diagram**
```
Mock Data → Utils → Components → UI
     ↓         ↓        ↓       ↓
 mockData.ts → profileUtils.ts → ClientProfile.tsx → CollapsibleCard.tsx
```

### **Data Transformation Pipeline**

#### **1. Mock Data Layer**
```typescript
// mockData.ts
export const clientData = {
  id: "client-001",
  name: "John Smith",
  email: "john.smith@email.com",
  // ... complete client data
};
```

#### **2. Utility Layer**
```typescript
// profileUtils.ts
export const getVisibleSections = (leadType: string): string[] => {
  const sectionMap = {
    'Prospect': ['clientProfile', 'annuity', 'notes', 'messageHistory', 'offer'],
    'Warm': ['clientProfile', 'annuity', 'notes', 'messageHistory', 'offer', 'attorney'],
    // ... configuration for each lead type
  };
  return sectionMap[leadType] || [];
};
```

#### **3. Component Layer**
```typescript
// ClientProfile.tsx
const ClientProfile: React.FC<ClientProfileProps> = ({ leadType = 'Prospect' }) => {
  const visibleSections = getVisibleSections(leadType);
  const clientData = getClientData();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <LeftColumn {...props} />
      <MiddleColumn {...props} />
      <RightColumn {...props} />
    </div>
  );
};
```

## 📁 File Organization

### **Folder Structure Philosophy**

#### **Feature-Based Organization**
```
src/app/rep-dashboard/components/
├── client-profile/              # Feature: Client Management
│   ├── sections/               # UI: Column components
│   ├── document-hub/           # Feature: Document Management
│   ├── deal-management/        # Feature: Deal Tracking
│   ├── shared/                 # Shared: Reusable components
│   ├── hooks/                  # Logic: Custom hooks
│   ├── utils/                  # Logic: Utility functions
│   └── types/                  # Types: TypeScript definitions
├── lead-management/            # Feature: Lead Pipeline
├── campaign-management/        # Feature: Campaign Organization
└── phone-management/           # Feature: Communication
```

#### **Benefits of This Structure**
- **Feature Isolation**: Related code stays together
- **Scalability**: Easy to add new features
- **Maintainability**: Clear separation of concerns
- **Team Collaboration**: Developers can work on isolated features

### **Import/Export Strategy**

#### **Barrel Exports (index.ts files)**
```typescript
// client-profile/index.ts
export { default as ClientProfile } from './ClientProfile';
export { default as DocumentHub } from './document-hub/DocumentHub';
export { default as DealManagementHub } from './deal-management/DealManagementHub';
export * from './types';
export * from './utils';
```

#### **Clean Import Statements**
```typescript
// Clean imports using barrel exports
import { 
  ClientProfile, 
  DocumentHub, 
  useClientProfileState,
  type SectionKey 
} from './components/client-profile';
```

## 🎨 Design Patterns

### **1. Container/Presentational Pattern**

#### **Container Component (Logic)**
```typescript
// ClientProfile.tsx - Container
const ClientProfile: React.FC<ClientProfileProps> = ({ leadType }) => {
  const {
    expandedSections,
    toggleSection,
    showDocumentHub,
    setShowDocumentHub
  } = useClientProfileState();

  const visibleSections = getVisibleSections(leadType);
  const clientData = getClientData();

  return (
    <>
      <LeftColumn 
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        visibleSections={visibleSections}
        clientData={clientData}
      />
      {/* ... other columns */}
    </>
  );
};
```

#### **Presentational Component (UI)**
```typescript
// LeftColumn.tsx - Presentational
const LeftColumn: React.FC<ColumnProps> = ({
  expandedSections,
  toggleSection,
  visibleSections,
  clientData
}) => {
  return (
    <div className="space-y-6">
      <CollapsibleCard
        title="Client Details"
        isExpanded={expandedSections.clientProfile}
        onToggle={() => toggleSection('clientProfile')}
        isDisabled={!visibleSections.includes('clientProfile')}
      >
        <ClientDetailsCard data={clientData} />
      </CollapsibleCard>
    </div>
  );
};
```

### **2. Compound Component Pattern**

#### **CollapsibleCard Implementation**
```typescript
const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  subtitle,
  children,
  isExpanded,
  onToggle,
  isDisabled,
  disabledMessage,
  cardType
}) => {
  const cardStyle = getCardStyle(cardType);
  
  return (
    <div className={`relative ${isDisabled ? 'opacity-50' : ''}`}>
      {/* Header */}
      <button onClick={isDisabled ? undefined : onToggle}>
        {/* Header content */}
      </button>
      
      {/* Expandable Content */}
      {isExpanded && !isDisabled && (
        <div className="p-6">
          {children}
        </div>
      )}
      
      {/* Disabled Overlay */}
      {isDisabled && disabledMessage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-800 text-white px-3 py-1 rounded text-sm">
            {disabledMessage}
          </div>
        </div>
      )}
    </div>
  );
};
```

### **3. Factory Pattern for Styling**

#### **Dynamic Style Generation**
```typescript
const getCardStyle = (cardType?: string) => {
  const styles = {
    'client profile': {
      headerBg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    'cash advance': {
      headerBg: 'bg-amber-50',
      iconBg: 'bg-amber-100', 
      textColor: 'text-amber-800'
    },
    // ... other card types
  } as const;

  return styles[cardType as keyof typeof styles] || styles['client profile'];
};
```

## 🔗 Integration Points

### **API Integration Architecture**

#### **Service Layer Design**
```typescript
// Future API integration structure
export class ClientService {
  static async getClient(id: string): Promise<ClientData> {
    // API call implementation
  }
  
  static async updateClient(id: string, data: Partial<ClientData>): Promise<ClientData> {
    // API call implementation
  }
}

export class DocumentService {
  static async uploadDocument(clientId: string, file: File): Promise<Document> {
    // File upload implementation
  }
  
  static async getDocuments(clientId: string): Promise<Document[]> {
    // Document retrieval implementation
  }
}
```

#### **Real-Time Integration Points**
```typescript
// WebSocket integration structure
export class RealtimeService {
  static subscribe(clientId: string, callback: (data: any) => void) {
    // WebSocket subscription
  }
  
  static broadcast(event: string, data: any) {
    // Real-time event broadcasting
  }
}
```

### **Mobile Integration Architecture**

#### **React Native Bridge Points**
```typescript
// Mobile-optimized data structures
interface MobileClientSummary {
  id: string;
  name: string;
  status: LeadStatus;
  priority: Priority;
  lastContact: string;
  nextAction: string;
}

// Mobile API endpoints
export class MobileAPI {
  static async syncClientData(clientId: string): Promise<MobileClientSummary> {
    // Optimized data for mobile consumption
  }
}
```

## 🚀 Performance Considerations

### **Code Splitting Strategy**
```typescript
// Lazy loading for large components
const DocumentHub = lazy(() => import('./document-hub/DocumentHub'));
const DealManagementHub = lazy(() => import('./deal-management/DealManagementHub'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  {showDocumentHub && <DocumentHub />}
</Suspense>
```

### **Memoization Strategy**
```typescript
// Memoized expensive calculations
const visibleSections = useMemo(() => 
  getVisibleSections(leadType), 
  [leadType]
);

// Memoized components
const MemoizedClientDetailsCard = memo(ClientDetailsCard);
```

## 🧪 Testing Architecture

### **Component Testing Strategy**
```typescript
// Unit test structure
describe('ClientProfile', () => {
  it('should render correct sections for Prospect lead type', () => {
    render(<ClientProfile leadType="Prospect" />);
    expect(screen.getByText('Client Details')).toBeInTheDocument();
    expect(screen.queryByText('Attorney Info')).not.toBeInTheDocument();
  });
});
```

### **Integration Testing Points**
```typescript
// Service integration tests
describe('ClientService', () => {
  it('should fetch client data correctly', async () => {
    const clientData = await ClientService.getClient('client-001');
    expect(clientData).toMatchObject({
      id: 'client-001',
      name: expect.any(String)
    });
  });
});
```

---

This architecture provides a solid foundation for:
- **Scalability**: Easy to add new features and components
- **Maintainability**: Clear separation of concerns and modular structure  
- **Testability**: Well-defined interfaces and isolated logic
- **Performance**: Optimized rendering and code splitting ready
- **Integration**: Clean API boundaries and real-time capabilities

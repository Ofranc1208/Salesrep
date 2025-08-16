# API Integration Guide

This document outlines the API integration strategy for the Structured Settlement CRM Platform, including endpoint specifications, data models, and integration patterns.

## 📋 Table of Contents

1. [Integration Overview](#integration-overview)
2. [Data Models](#data-models)
3. [API Endpoints](#api-endpoints)
4. [Authentication](#authentication)
5. [Real-Time Integration](#real-time-integration)
6. [Mobile API](#mobile-api)
7. [Integration Examples](#integration-examples)

## 🔗 Integration Overview

### **Current State: Frontend-Ready**
- ✅ Complete TypeScript interfaces for all data models
- ✅ Service layer architecture prepared for API calls
- ✅ Mock data system matching expected API responses
- ✅ Error handling structure in place
- ✅ Real-time update architecture ready

### **Integration Readiness: 90%**
The frontend is architected to seamlessly integrate with backend APIs with minimal refactoring required.

## 📊 Data Models

### **Core Entities**

#### **Lead Model**
```typescript
interface Lead {
  id: string;
  crmId: string;
  clientName: string;
  email: string;
  phone: string;
  status: 'Prospect' | 'Warm' | 'Hot' | 'Active';
  campaignName: string;
  assignedRep: string;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  updatedAt: string;
  phoneNumbers: PhoneNumber[];
  lastContact?: string;
  nextFollowUp?: string;
  source: string;
  tags: string[];
}
```

#### **Client Model**
```typescript
interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  dateOfBirth: string;
  socialSecurityNumber: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

#### **Deal Model**
```typescript
interface Deal {
  id: string;
  clientId: string;
  type: 'GP' | 'LCP'; // Guaranteed Payment or Life Contingent Payment
  status: 'active' | 'completed' | 'cancelled';
  totalValue: number;
  commission: {
    rate: number;
    amount: number;
    paid: boolean;
  };
  stages: DealStage[];
  documents: Document[];
  createdAt: string;
  updatedAt: string;
  estimatedFundingDate?: string;
  actualFundingDate?: string;
}
```

#### **Document Model**
```typescript
interface Document {
  id: string;
  clientId: string;
  dealId?: string;
  name: string;
  category: 'legal' | 'financial' | 'identification' | 'transaction' | 'communication';
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  uploadedAt: string;
  uploadedBy: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  metadata?: Record<string, any>;
}
```

#### **Activity Model**
```typescript
interface ActivityEntry {
  id: string;
  clientId: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'document' | 'system';
  content: string;
  createdAt: string;
  createdBy: string;
  metadata?: {
    duration?: number; // for calls
    emailSubject?: string; // for emails
    meetingLocation?: string; // for meetings
    documentId?: string; // for document activities
  };
}
```

## 🛠️ API Endpoints

### **Lead Management Endpoints**

#### **GET /api/leads**
Retrieve leads with filtering and pagination
```typescript
// Query Parameters
interface LeadQuery {
  status?: 'Prospect' | 'Warm' | 'Hot' | 'Active';
  campaign?: string;
  assignedRep?: string;
  page?: number;
  limit?: number;
  search?: string;
}

// Response
interface LeadResponse {
  leads: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### **POST /api/leads**
Create a new lead
```typescript
// Request Body
interface CreateLeadRequest {
  clientName: string;
  email: string;
  phone: string;
  campaignName: string;
  source: string;
  priority?: 'High' | 'Medium' | 'Low';
  tags?: string[];
}

// Response
interface CreateLeadResponse {
  lead: Lead;
  message: string;
}
```

#### **PUT /api/leads/{id}**
Update lead information
```typescript
// Request Body
interface UpdateLeadRequest {
  status?: 'Prospect' | 'Warm' | 'Hot' | 'Active';
  assignedRep?: string;
  priority?: 'High' | 'Medium' | 'Low';
  nextFollowUp?: string;
  tags?: string[];
}

// Response
interface UpdateLeadResponse {
  lead: Lead;
  message: string;
}
```

### **Client Management Endpoints**

#### **GET /api/clients/{id}**
Retrieve complete client profile
```typescript
// Response
interface ClientProfileResponse {
  client: ClientData;
  annuity: AnnuityData;
  offer: OfferData;
  activities: ActivityEntry[];
  documents: Document[];
  deals: Deal[];
  phoneNumbers: PhoneNumber[];
}
```

#### **PUT /api/clients/{id}**
Update client information
```typescript
// Request Body
interface UpdateClientRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: Partial<ClientData['address']>;
  emergencyContact?: Partial<ClientData['emergencyContact']>;
}

// Response
interface UpdateClientResponse {
  client: ClientData;
  message: string;
}
```

### **Document Management Endpoints**

#### **POST /api/documents/upload**
Upload a new document
```typescript
// Request (Multipart Form Data)
interface UploadDocumentRequest {
  file: File;
  clientId: string;
  category: 'legal' | 'financial' | 'identification' | 'transaction' | 'communication';
  dealId?: string;
  metadata?: string; // JSON string
}

// Response
interface UploadDocumentResponse {
  document: Document;
  message: string;
}
```

#### **GET /api/documents/{clientId}**
Retrieve client documents
```typescript
// Query Parameters
interface DocumentQuery {
  category?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'expired';
  dealId?: string;
}

// Response
interface DocumentResponse {
  documents: Document[];
  categoryCounts: Record<string, number>;
}
```

#### **PUT /api/documents/{id}/status**
Update document status
```typescript
// Request Body
interface UpdateDocumentStatusRequest {
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  notes?: string;
}

// Response
interface UpdateDocumentStatusResponse {
  document: Document;
  message: string;
}
```

### **Deal Management Endpoints**

#### **GET /api/deals/{clientId}**
Retrieve client deals
```typescript
// Response
interface DealsResponse {
  deals: Deal[];
  summary: {
    totalValue: number;
    totalCommission: number;
    activeDeals: number;
    completedDeals: number;
  };
}
```

#### **PUT /api/deals/{id}/stage**
Update deal stage progress
```typescript
// Request Body
interface UpdateDealStageRequest {
  stageId: string;
  status: 'completed' | 'in-progress' | 'locked';
  notes?: string;
  completedTasks?: string[];
}

// Response
interface UpdateDealStageResponse {
  deal: Deal;
  nextStage?: DealStage;
  message: string;
}
```

### **Activity Management Endpoints**

#### **POST /api/activities**
Create a new activity entry
```typescript
// Request Body
interface CreateActivityRequest {
  clientId: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'document' | 'system';
  content: string;
  metadata?: Record<string, any>;
}

// Response
interface CreateActivityResponse {
  activity: ActivityEntry;
  message: string;
}
```

#### **GET /api/activities/{clientId}**
Retrieve client activities
```typescript
// Query Parameters
interface ActivityQuery {
  type?: string;
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

// Response
interface ActivityResponse {
  activities: ActivityEntry[];
  pagination: {
    total: number;
    hasMore: boolean;
  };
}
```

## 🔐 Authentication

### **JWT Token Structure**
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: 'rep' | 'manager' | 'admin' | 'superadmin';
  permissions: string[];
  companyId: string;
  exp: number;
  iat: number;
}
```

### **Authentication Headers**
```typescript
// Required headers for authenticated requests
const headers = {
  'Authorization': `Bearer ${jwtToken}`,
  'Content-Type': 'application/json',
  'X-Company-ID': companyId // For multi-tenant support
};
```

### **Role-Based Access Control**
```typescript
interface RolePermissions {
  rep: [
    'leads:read',
    'leads:update',
    'clients:read',
    'clients:update',
    'documents:upload',
    'activities:create'
  ];
  manager: [
    ...repPermissions,
    'leads:assign',
    'reports:read',
    'team:manage'
  ];
  admin: [
    ...managerPermissions,
    'users:manage',
    'settings:update',
    'billing:read'
  ];
  superadmin: [
    ...adminPermissions,
    'companies:manage',
    'system:admin'
  ];
}
```

## ⚡ Real-Time Integration

### **WebSocket Events**

#### **Client-Side Event Listeners**
```typescript
// WebSocket connection setup
const ws = new WebSocket(`wss://api.example.com/ws?token=${jwtToken}`);

// Event listeners for real-time updates
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'LEAD_UPDATED':
      updateLeadInState(data.payload);
      break;
    case 'DOCUMENT_APPROVED':
      updateDocumentStatus(data.payload);
      break;
    case 'DEAL_STAGE_COMPLETED':
      updateDealProgress(data.payload);
      break;
    case 'NEW_ACTIVITY':
      addActivityToTimeline(data.payload);
      break;
  }
});
```

#### **Server-Side Event Types**
```typescript
interface WebSocketEvent {
  type: 'LEAD_UPDATED' | 'DOCUMENT_APPROVED' | 'DEAL_STAGE_COMPLETED' | 'NEW_ACTIVITY';
  payload: any;
  clientId?: string;
  userId?: string;
  timestamp: string;
}
```

### **Real-Time Service Integration**
```typescript
// Service layer for real-time updates
export class RealtimeService {
  private static ws: WebSocket;
  
  static connect(token: string) {
    this.ws = new WebSocket(`wss://api.example.com/ws?token=${token}`);
    this.setupEventListeners();
  }
  
  static subscribe(eventType: string, callback: (data: any) => void) {
    // Subscribe to specific event types
  }
  
  static emit(eventType: string, data: any) {
    // Emit events to server
    this.ws.send(JSON.stringify({ type: eventType, data }));
  }
}
```

## 📱 Mobile API

### **Mobile-Optimized Endpoints**

#### **GET /api/mobile/dashboard**
Lightweight dashboard data for mobile
```typescript
// Response optimized for mobile consumption
interface MobileDashboardResponse {
  summary: {
    totalLeads: number;
    activeDeals: number;
    pendingTasks: number;
    todayActivities: number;
  };
  recentLeads: MobileLeadSummary[];
  upcomingTasks: MobileTask[];
  notifications: MobileNotification[];
}

interface MobileLeadSummary {
  id: string;
  name: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  lastContact: string;
  nextAction: string;
}
```

#### **POST /api/mobile/sync**
Offline synchronization endpoint
```typescript
// Request for offline sync
interface MobileSyncRequest {
  lastSyncTimestamp: string;
  pendingActions: MobileAction[];
  deviceId: string;
}

interface MobileAction {
  type: 'CREATE_ACTIVITY' | 'UPDATE_LEAD' | 'UPLOAD_DOCUMENT';
  data: any;
  timestamp: string;
  localId: string;
}

// Response with updates since last sync
interface MobileSyncResponse {
  updates: {
    leads: Lead[];
    activities: ActivityEntry[];
    documents: Document[];
  };
  conflicts: SyncConflict[];
  syncTimestamp: string;
}
```

## 🔧 Integration Examples

### **Frontend Service Integration**

#### **Lead Service Implementation**
```typescript
// src/services/LeadService.ts
export class LeadService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  static async getLeads(query: LeadQuery = {}): Promise<LeadResponse> {
    const params = new URLSearchParams(query as any);
    const response = await fetch(`${this.baseUrl}/api/leads?${params}`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch leads: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  static async updateLead(id: string, data: UpdateLeadRequest): Promise<Lead> {
    const response = await fetch(`${this.baseUrl}/api/leads/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update lead: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.lead;
  }
  
  private static getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
}
```

#### **React Hook Integration**
```typescript
// Custom hook for API integration
export const useLeads = (query: LeadQuery = {}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await LeadService.getLeads(query);
        setLeads(response.leads);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leads');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeads();
  }, [JSON.stringify(query)]);
  
  const updateLead = async (id: string, data: UpdateLeadRequest) => {
    try {
      const updatedLead = await LeadService.updateLead(id, data);
      setLeads(prev => prev.map(lead => 
        lead.id === id ? updatedLead : lead
      ));
      return updatedLead;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead');
      throw err;
    }
  };
  
  return { leads, loading, error, updateLead };
};
```

### **Error Handling Strategy**

#### **API Error Types**
```typescript
interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

interface ValidationError extends APIError {
  code: 'VALIDATION_ERROR';
  details: {
    field: string;
    message: string;
  }[];
}

interface AuthError extends APIError {
  code: 'AUTH_ERROR';
  details: {
    reason: 'INVALID_TOKEN' | 'EXPIRED_TOKEN' | 'INSUFFICIENT_PERMISSIONS';
  };
}
```

#### **Error Handling Implementation**
```typescript
// Global error handler
export class APIErrorHandler {
  static handle(error: APIError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        this.handleValidationError(error as ValidationError);
        break;
      case 'AUTH_ERROR':
        this.handleAuthError(error as AuthError);
        break;
      default:
        this.handleGenericError(error);
    }
  }
  
  private static handleValidationError(error: ValidationError) {
    // Show field-specific validation errors
    error.details.forEach(({ field, message }) => {
      showFieldError(field, message);
    });
  }
  
  private static handleAuthError(error: AuthError) {
    if (error.details.reason === 'EXPIRED_TOKEN') {
      // Redirect to login
      window.location.href = '/login';
    }
  }
}
```

## 🚀 Deployment Considerations

### **Environment Configuration**
```typescript
// Environment variables for API integration
interface APIConfig {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_WS_URL: string;
  NEXT_PUBLIC_UPLOAD_URL: string;
  API_TIMEOUT: number;
  MAX_FILE_SIZE: number;
}
```

### **Performance Optimization**
```typescript
// Request caching strategy
export class APICache {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static TTL = 5 * 60 * 1000; // 5 minutes
  
  static get(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.data;
    }
    return null;
  }
  
  static set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}
```

---

This API integration guide provides a comprehensive roadmap for connecting the frontend with backend services, ensuring seamless data flow and real-time functionality across the entire platform.

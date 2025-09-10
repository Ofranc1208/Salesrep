# Lead Workflow Module

The Lead Workflow module orchestrates the flow of leads between Campaign Management and Lead Management systems. It provides a clean separation of concerns while maintaining state consistency across campaign switches and lead processing.

## Architecture

```
Campaign Management → Lead Workflow → Lead Management
```

## Purpose

- **Orchestrates** lead flow between campaign and lead management
- **Maintains** workflow state across campaign switches  
- **Coordinates** lead processing and status updates
- **Tracks** lead history and workflow analytics
- **Provides** clean separation between campaign and lead concerns

## Structure

```
lead-workflow/
├── services/           # Business logic and orchestration
│   ├── LeadWorkflowService.ts
│   └── index.ts
├── hooks/             # React hooks for workflow integration
│   ├── useLeadWorkflow.ts
│   └── index.ts
├── types/             # TypeScript interfaces and types
│   └── index.ts
├── utils/             # Utility functions
│   └── index.ts
├── index.ts           # Main exports
└── README.md          # This file
```

## Key Components

### LeadWorkflowService
- Singleton service managing workflow state
- Handles campaign switching with context preservation
- Coordinates lead selection and processing
- Maintains lead history and analytics
- Emits events for real-time updates

### useLeadWorkflow Hook
- React hook for workflow integration
- Provides state management and actions
- Handles event subscriptions and cleanup
- Memoized functions for performance

### Types
- Comprehensive TypeScript interfaces
- Workflow context and state definitions
- Event and action type definitions
- Lead enrichment with workflow context

## Usage

```typescript
import { useLeadWorkflow } from '../lead-workflow';

function MyComponent() {
  const {
    workflowContext,
    setActiveCampaign,
    selectLead,
    updateLeadStatus
  } = useLeadWorkflow();
  
  // Use workflow methods...
}
```

## Benefits

- ✅ **Single Responsibility**: Each component has focused concerns
- ✅ **State Consistency**: Centralized workflow state management
- ✅ **Event-Driven**: Real-time updates across components
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Testable**: Clean interfaces for unit testing
- ✅ **Scalable**: Easy to extend with new workflow features

## Integration Points

### With Campaign Management
- Receives campaign selection changes
- Handles lead assignment acceptance/decline
- Provides campaign-specific lead data

### With Lead Management  
- Provides selected lead for processing
- Receives lead status updates
- Maintains processing context

This architecture ensures that Campaign Management focuses on campaign concerns, Lead Management focuses on lead processing, and the Lead Workflow handles the coordination between them.

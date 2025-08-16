# Phase 2 Testing Guide: Manager ↔ Rep Dashboard Connection

## Overview
Phase 2 demonstrates the real-time connection between the Manager Dashboard and Sales Rep Dashboard using our shared data flow services.

## How to Test

### Step 1: Open Both Dashboards
1. **Manager Dashboard**: Navigate to `localhost:3000/manager-dashboard`
2. **Rep Dashboard**: Navigate to `localhost:3000/rep-dashboard` (in another tab)

### Step 2: Test Data Flow in Manager Dashboard
1. Click the **"Test Data Flow"** button (purple button in top-right)
2. Click **"Add Test Leads"** to create sample data
3. Select a **Sales Rep** from the dropdown (e.g., "Client Relations Rep One")
4. Select a **Campaign** from the dropdown
5. Click **"Assign to [Rep Name]"** on each lead
6. Watch the **Assignment Statistics** update in real-time

### Step 3: Verify Connection in Rep Dashboard
1. Look for the **"Data Flow Connection"** section at the top-left
2. Status should show **"Connected"** with a green dot
3. **Statistics** should display the assigned leads:
   - Total: Number of leads assigned to this rep
   - Pending: Leads ready to process
   - In Progress: Leads being worked on
   - Completed: Finished leads

### Step 4: Test Real-Time Updates
1. **In Manager Dashboard**: Change lead status from "Assigned" to "Contacted"
2. **In Rep Dashboard**: Watch the statistics update automatically
3. **Check Browser Console**: Look for event logs showing data flow

## What You Should See

### Manager Dashboard (Test View)
✅ **Test Leads**: 2 sample leads (James Takori, Cheryl Doel)
✅ **Assignment Controls**: Dropdowns for Sales Rep and Campaign selection
✅ **Assignment Statistics**: Real-time counters for total, active, completed assignments
✅ **Action Buttons**: Assign leads to specific sales reps

### Rep Dashboard
✅ **Connection Status**: Green "Connected" indicator
✅ **Real-Time Stats**: Numbers that update when Manager assigns leads
✅ **Lead List**: Shows leads assigned to this specific rep
✅ **Status Updates**: Lead status changes reflect in real-time

## Expected Data Flow

1. **Manager adds leads** → Leads appear in shared system
2. **Manager assigns leads** → Leads are distributed to specific reps
3. **Rep Dashboard receives** → Real-time updates via shared services
4. **Rep processes leads** → Status updates flow back to shared system
5. **Manager sees progress** → Assignment statistics update automatically

## Troubleshooting

### If Connection Shows "Disconnected"
- Check that both dashboards are running
- Verify the shared services are loaded
- Check browser console for errors

### If Stats Don't Update
- Ensure you're using the same `repId` in both dashboards
- Check that leads are being assigned to the correct rep
- Verify the shared data flow service is working

### If Leads Don't Appear
- Make sure you clicked "Add Test Leads" in Manager Dashboard
- Check that leads are assigned to the correct sales rep
- Verify the data conversion between shared and rep formats

## Technical Details

- **Shared Services**: `DataFlowService`, `AssignmentEngine`, `useDataFlow`
- **Data Conversion**: `BaseLead` → `Lead` format conversion
- **Real-Time Updates**: Event-driven updates via shared service
- **Rep Identification**: Uses `repId` to filter leads per sales rep

## Next Steps

Once Phase 2 is working correctly, we can proceed to:
- **Phase 3**: Message template integration
- **Phase 4**: Phone number validation and cleaning
- **Phase 5**: 8x8 integration for actual messaging

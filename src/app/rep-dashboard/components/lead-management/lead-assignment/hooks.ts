import { useState, useCallback, useMemo } from 'react';
import { Lead } from '../../../types';

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  maxLeads: number;
  currentLeads: number;
  specialties: string[];
  isActive: boolean;
  workloadScore: number;
}

export interface AssignmentRule {
  id: string;
  name: string;
  condition: 'priority' | 'amount' | 'insurance' | 'location' | 'custom';
  value: string;
  assignTo: string; // Rep ID
  isActive: boolean;
  order: number;
}

export interface RepWorkload {
  repId: string;
  totalLeads: number;
  activeLeads: number;
  completedLeads: number;
  averageResponseTime: number;
  conversionRate: number;
  capacity: number;
}

export interface UseLeadAssignmentReturn {
  unassignedLeads: Lead[];
  salesReps: SalesRep[];
  assignmentRules: AssignmentRule[];
  assignLead: (leadId: string, repId: string) => Promise<void>;
  bulkAssign: (assignments: { leadId: string; repId: string }[]) => Promise<void>;
  updateAssignmentRules: (rules: AssignmentRule[]) => void;
  getRepWorkload: (repId: string) => RepWorkload;
  isAssigning: boolean;
  error: string | null;
}

export function useLeadAssignment(leads: Lead[]): UseLeadAssignmentReturn {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assignmentRules, setAssignmentRules] = useState<AssignmentRule[]>([
    {
      id: 'rule_1',
      name: 'High Priority to Rep 1',
      condition: 'priority',
      value: 'High',
      assignTo: 'Rep 1',
      isActive: true,
      order: 1
    },
    {
      id: 'rule_2',
      name: 'Large Amounts to Senior Rep',
      condition: 'amount',
      value: '50000',
      assignTo: 'Rep 1',
      isActive: true,
      order: 2
    },
    {
      id: 'rule_3',
      name: 'Default Assignment',
      condition: 'custom',
      value: 'default',
      assignTo: 'Rep 1',
      isActive: true,
      order: 999
    }
  ]);

  // Mock sales reps data
  const salesReps: SalesRep[] = useMemo(() => [
    {
      id: 'Rep 1',
      name: 'Rep 1',
      email: 'rep1@company.com',
      maxLeads: 50,
      currentLeads: leads.filter(lead => lead.assignedTo === 'Rep 1').length,
      specialties: ['High Value', 'Complex Cases'],
      isActive: true,
      workloadScore: 0.7
    },
    {
      id: 'Rep 2',
      name: 'Rep 2',
      email: 'rep2@company.com',
      maxLeads: 40,
      currentLeads: leads.filter(lead => lead.assignedTo === 'Rep 2').length,
      specialties: ['Quick Turnaround', 'Standard Cases'],
      isActive: true,
      workloadScore: 0.5
    },
    {
      id: 'Rep 3',
      name: 'Rep 3',
      email: 'rep3@company.com',
      maxLeads: 35,
      currentLeads: leads.filter(lead => lead.assignedTo === 'Rep 3').length,
      specialties: ['New Clients', 'Follow-ups'],
      isActive: true,
      workloadScore: 0.3
    }
  ], [leads]);

  const unassignedLeads = useMemo(() => 
    leads.filter(lead => !lead.assignedTo || lead.assignedTo === ''),
    [leads]
  );

  const assignLead = useCallback(async (leadId: string, repId: string): Promise<void> => {
    setIsAssigning(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would update the backend
      console.log(`Assigned lead ${leadId} to ${repId}`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Assignment failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsAssigning(false);
    }
  }, []);

  const bulkAssign = useCallback(async (assignments: { leadId: string; repId: string }[]): Promise<void> => {
    setIsAssigning(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would update the backend
      console.log(`Bulk assigned ${assignments.length} leads`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bulk assignment failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsAssigning(false);
    }
  }, []);

  const updateAssignmentRules = useCallback((rules: AssignmentRule[]) => {
    setAssignmentRules(rules);
  }, []);

  const getRepWorkload = useCallback((repId: string): RepWorkload => {
    const repLeads = leads.filter(lead => lead.assignedTo === repId);
    const rep = salesReps.find(r => r.id === repId);
    
    return {
      repId,
      totalLeads: repLeads.length,
      activeLeads: repLeads.filter(lead => ['New', 'Assigned', 'In Progress'].includes(lead.status)).length,
      completedLeads: repLeads.filter(lead => lead.processed).length,
      averageResponseTime: Math.random() * 24, // Mock data
      conversionRate: Math.random() * 0.3 + 0.1, // Mock data
      capacity: rep ? (repLeads.length / rep.maxLeads) : 0
    };
  }, [leads, salesReps]);

  return {
    unassignedLeads,
    salesReps,
    assignmentRules,
    assignLead,
    bulkAssign,
    updateAssignmentRules,
    getRepWorkload,
    isAssigning,
    error
  };
}

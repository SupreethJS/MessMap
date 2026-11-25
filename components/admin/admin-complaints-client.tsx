"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Calendar,
  User,
} from "lucide-react";
import { Complaint, ComplaintCategory, ComplaintStatus } from "@/lib/types/database";
import { updateComplaintAction } from "@/app/actions/complaint-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface AdminComplaintsClientProps {
  initialComplaints: Complaint[];
}

export function AdminComplaintsClient({ initialComplaints }: AdminComplaintsClientProps) {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Selected complaint for response modal
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>("In Progress");
  const [adminRemarks, setAdminRemarks] = useState("");
  const [rebateAmount, setRebateAmount] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Filter calculations
  const filtered = complaints.filter((c) => {
    // Status normalization
    const normalizedStatus = c.status.toLowerCase().replace(" ", "_");
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "open" && (normalizedStatus === "pending" || normalizedStatus === "open")) ||
      (statusFilter === "in_progress" && (normalizedStatus === "in_progress" || normalizedStatus === "in progress")) ||
      (statusFilter === "resolved" && (normalizedStatus === "resolved"));

    // Category normalization
    const matchesCategory =
      categoryFilter === "all" ||
      c.category.toLowerCase().includes(categoryFilter.toLowerCase());

    // Search query
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const totalComplaints = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === "Pending" || (c.status as string) === "open").length;
  const inProgressCount = complaints.filter((c) => c.status === "In Progress" || (c.status as string) === "in_progress").length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved" || (c.status as string) === "resolved").length;
  const totalRebates = complaints.reduce((sum, c) => sum + (c.rebate_amount || 0), 0);

  const handleOpenModal = (c: Complaint) => {
    setSelectedComplaint(c);
    setNewStatus(c.status);
    setAdminRemarks(c.admin_remarks || "");
    setRebateAmount(c.rebate_amount || 0);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    setIsUpdating(true);
    const res = await updateComplaintAction({
      complaintId: selectedComplaint.id,
      status: newStatus,
      adminRemarks,
      rebateAmount: Number(rebateAmount) || 0,
    });
    setIsUpdating(false);

    if (res.success && res.complaint) {
      toast.success(`Complaint #${selectedComplaint.id} updated to "${newStatus}"!`);
      setComplaints((prev) =>
        prev.map((c) => (c.id === selectedComplaint.id ? res.complaint! : c))
      );
      setSelectedComplaint(null);
    } else {
      toast.error(res.error || "Failed to update complaint");
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "Urgent":
        return <Badge variant="destructive" className="font-extrabold text-[10px]">URGENT</Badge>;
      case "High":
        return <Badge variant="destructive" className="font-bold text-[10px] bg-amber-600">HIGH</Badge>;
      default:
        return <Badge variant="secondary" className="font-medium text-[10px]">NORMAL</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "resolved") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
          <CheckCircle2 className="w-3 h-3" /> Resolved
        </span>
      );
    }
    if (s === "in_progress" || s === "in progress") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
          <Clock className="w-3 h-3" /> In Progress
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
        <AlertCircle className="w-3 h-3" /> Pending Review
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & High-level Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Complaints & Rebate Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review student food quality grievances, post official responses, and disburse dining refunds.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Tickets</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">{totalComplaints}</span>
          <span className="text-[10px] text-slate-400">Hostel mess issues</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">Pending</span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block">{pendingCount}</span>
          <span className="text-[10px] text-slate-400">Awaiting response</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">In Progress</span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">{inProgressCount}</span>
          <span className="text-[10px] text-slate-400">Kitchen investigating</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">Resolved</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{resolvedCount}</span>
          <span className="text-[10px] text-slate-400">Action concluded</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">Rebates Issued</span>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">₹{totalRebates}</span>
          <span className="text-[10px] text-slate-400">Direct wallet refunds</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search complaints by student, title, issue, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter complaints by status"
              className="h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <option value="all">All Statuses</option>
              <option value="open">Pending / Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter complaints by category"
            className="h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <option value="all">All Categories</option>
            <option value="Food Quality">Food Quality</option>
            <option value="Hygiene">Hygiene & Cleanliness</option>
            <option value="Food Quantity">Food Quantity</option>
            <option value="Late Serving">Timing / Late Serving</option>
            <option value="Menu Issues">Menu Issues</option>
            <option value="Billing">Billing & Rebates</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Complaints Cards List */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 text-xs font-medium">
            No complaints found matching the selected filters.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">#{item.id}</span>
                  {getStatusBadge(item.status)}
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700">
                    {item.category}
                  </span>
                  {getUrgencyBadge(item.urgency)}
                  {item.rebate_amount && item.rebate_amount > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                      <IndianRupee className="w-3 h-3" /> ₹{item.rebate_amount} Rebate Issued
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{item.description}</p>
              </div>

              {/* Student Identity & Remarks Strip */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.student_name}</span>
                  <span className="text-[11px] font-mono text-slate-400">({item.student_id})</span>
                </div>

                {item.admin_remarks && (
                  <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 max-w-md">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">Admin Response:</span>
                    {item.admin_remarks}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleOpenModal(item)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold transition-all shadow-xs shrink-0 self-end sm:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Respond & Update</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Admin Response & Rebate Modal */}
      {selectedComplaint && (
        <Dialog open={!!selectedComplaint} onOpenChange={(open) => !open && setSelectedComplaint(null)}>
          <DialogContent className="max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <form onSubmit={handleUpdate} className="space-y-4">
              <DialogHeader className="space-y-1">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <DialogTitle className="text-base font-bold">
                    Official Admin Response • #{selectedComplaint.id}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Update resolution status, post kitchen catering remarks, or credit a mess rebate to the student.
                </DialogDescription>
              </DialogHeader>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">{selectedComplaint.title}</div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">{selectedComplaint.description}</div>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Update Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <option value="Pending">Pending Review</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved & Closed</option>
                </select>
              </div>

              {/* Admin Remarks */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Official Kitchen / Admin Remarks
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail the remedial action taken (e.g. inspected vendor supplies, disciplined cook, issued rebate)..."
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus:bg-white dark:focus:bg-slate-900"
                />
              </div>

              {/* Rebate Amount */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Dining Wallet Rebate (Optional ₹)</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Instant refund credit</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-xs pointer-events-none">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    placeholder="0"
                    value={rebateAmount}
                    onChange={(e) => setRebateAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full h-11 pl-8 pr-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="min-h-[44px] flex-1 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save & Notify Student"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

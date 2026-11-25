"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { submitComplaintAction } from "@/app/actions/complaint-actions";
import { toast } from "sonner";

interface ComplaintModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComplaintModal({ open, onOpenChange }: ComplaintModalProps) {
  const [category, setCategory] = useState<any>("Food Quality");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<any>("Normal");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in both title and description");
      return;
    }

    setLoading(true);
    const res = await submitComplaintAction({
      category,
      title,
      description,
      urgency,
    });
    setLoading(false);

    if (res.success) {
      toast.success(`Complaint #${res.complaint?.id} submitted successfully!`);
      setTitle("");
      setDescription("");
      onOpenChange(false);
    } else {
      toast.error(res.error || "Failed to submit complaint");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
              <div className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <DialogTitle className="text-lg font-bold">Raise a Hostel Mess Complaint</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              Submit an issue directly to the hostel catering committee and mess contractor.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="complaint-category" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Complaint Category
                </label>
                <select
                  id="complaint-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs font-medium text-slate-800 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <option value="Food Quality">Food Quality</option>
                  <option value="Hygiene">Hygiene & Cleanliness</option>
                  <option value="Food Quantity">Food Quantity / Shortage</option>
                  <option value="Late Serving">Late Serving Timings</option>
                  <option value="Menu Issues">Menu Non-Adherence</option>
                  <option value="Other">Other Issues</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="complaint-urgency" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Urgency Level
                </label>
                <select
                  id="complaint-urgency"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 text-xs font-medium text-slate-800 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="complaint-title" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Subject / Title
              </label>
              <input
                id="complaint-title"
                type="text"
                placeholder="Brief summary of the issue..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus:bg-white dark:focus:bg-slate-900 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="complaint-desc" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Detailed Description
              </label>
              <textarea
                id="complaint-desc"
                rows={3}
                placeholder="Provide specific details (meal time, table, dish name, or observation)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus:bg-white dark:focus:bg-slate-900 transition-colors"
              />
            </div>
          </div>

          <DialogFooter className="gap-2.5">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

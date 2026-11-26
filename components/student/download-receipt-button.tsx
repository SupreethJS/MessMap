"use client";

import { useState } from "react";
import { Download, Printer, ShieldCheck, Sparkles, X, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DownloadReceiptButtonProps {
  transactionId: string;
  transaction?: {
    id?: string;
    amount?: number;
    description?: string;
    type?: string;
    status?: string;
    created_at?: string;
  };
}

export function DownloadReceiptButton({
  transactionId,
  transaction,
}: DownloadReceiptButtonProps) {
  const [open, setOpen] = useState(false);

  const txData = {
    id: transaction?.id || transactionId,
    amount: transaction?.amount !== undefined ? Math.abs(transaction.amount) : 450,
    description: transaction?.description || "Hostel Mess Prepaid Dining Top-Up",
    type: transaction?.type || "topup",
    status: transaction?.status || "Success",
    date: transaction?.created_at
      ? new Date(transaction.created_at).toLocaleString()
      : new Date().toLocaleString(),
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Please allow popups to print receipt.");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dining Payment Receipt - ${txData.id}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              padding: 40px;
              color: #0f172a;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 16px;
              margin-bottom: 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .brand {
              font-size: 18px;
              font-weight: 800;
              color: #f59e0b;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .sub {
              font-size: 12px;
              color: #64748b;
              margin-top: 2px;
            }
            .badge {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 9999px;
              background-color: #ecfdf5;
              color: #059669;
              font-size: 11px;
              font-weight: 700;
              border: 1px solid #a7f3d0;
            }
            .details-table {
              width: 100%;
              border-collapse: collapse;
              margin: 24px 0;
            }
            .details-table td {
              padding: 10px 0;
              border-bottom: 1px solid #f1f5f9;
              font-size: 13px;
            }
            .details-table td.label {
              color: #64748b;
              font-weight: 500;
              width: 40%;
            }
            .details-table td.val {
              font-weight: 600;
              text-align: right;
            }
            .total-row {
              font-size: 18px;
              font-weight: 800;
              color: #0f172a;
              border-top: 2px dashed #cbd5e1;
              padding-top: 14px;
              display: flex;
              justify-content: space-between;
            }
            .footer {
              margin-top: 40px;
              padding-top: 16px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              font-size: 11px;
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">Central Mess Hall 1</div>
              <div class="sub">Smart Mess Management System • Campus Dining</div>
            </div>
            <div class="badge">PAID / SETTLED</div>
          </div>

          <div style="font-size: 12px; color: #64748b;">
            <strong>Transaction Receipt:</strong> #${txData.id}<br/>
            <strong>Date & Time:</strong> ${txData.date}
          </div>

          <table class="details-table">
            <tr>
              <td class="label">Hostel Resident</td>
              <td class="val">Darshan Kulkarni (Roll: 2024CS001)</td>
            </tr>
            <tr>
              <td class="label">Hostel Block</td>
              <td class="val">Block A, Room 101</td>
            </tr>
            <tr>
              <td class="label">Transaction Type</td>
              <td class="val" style="text-transform: capitalize;">${txData.type.replace("_", " ")}</td>
            </tr>
            <tr>
              <td class="label">Description</td>
              <td class="val">${txData.description}</td>
            </tr>
            <tr>
              <td class="label">Payment Channel</td>
              <td class="val">Campus Unified Dining Gateway (UPI / NetBanking)</td>
            </tr>
            <tr>
              <td class="label">Status</td>
              <td class="val" style="color: #059669;">Verified & Settled</td>
            </tr>
          </table>

          <div class="total-row">
            <span>Total Amount Paid</span>
            <span>₹${txData.amount}.00</span>
          </div>

          <div class="footer">
            <p>This is a computer-generated tax and mess dining receipt. No physical signature required.</p>
            <p>Central Mess Committee • Student Welfare & Catering Services</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    toast.success(`Printing receipt #${txData.id}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors inline-flex items-center gap-1"
        title="View & Download Receipt"
      >
        <Download className="w-4 h-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold">
                  Official Dining Payment Receipt
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Verified hostel mess transaction record
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Styled Receipt Card Preview */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-3 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Central Mess Hall 1
                </span>
                <p className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  Receipt #{txData.id}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {txData.status}
              </span>
            </div>

            <div className="space-y-2 py-1">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Date & Time:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {txData.date}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Description:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {txData.description}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Type:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200 capitalize">
                  {txData.type.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Resident:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  Darshan Kulkarni (2024CS001)
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-dashed border-slate-300 dark:border-slate-700 flex justify-between items-center text-sm font-bold text-slate-900 dark:text-slate-100">
              <span>Total Paid:</span>
              <span className="text-base text-emerald-600 dark:text-emerald-400">
                ₹{txData.amount}.00
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

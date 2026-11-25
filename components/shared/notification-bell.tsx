"use client";

import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  markNotificationReadAction,
  markAllNotificationsReadAction,
} from "@/app/actions/notification-actions";
import { Notification } from "@/lib/types/database";
import { formatDistanceToNow } from "date-fns";

interface NotificationBellProps {
  notifications: Notification[];
}

export function NotificationBell({ notifications = [] }: NotificationBellProps) {
  const [items, setItems] = useState<Notification[]>(notifications);
  const [open, setOpen] = useState(false);

  const unreadCount = items.filter((n) => !n.is_read).length;

  const handleMarkAsRead = async (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_read: true } : item))
    );
    await markNotificationReadAction(id);
  };

  const handleMarkAllAsRead = async () => {
    setItems((prev) => prev.map((item) => ({ ...item, is_read: true })));
    await markAllNotificationsReadAction();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          aria-label={`Notifications, ${unreadCount} unread`}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 dark:bg-amber-400 text-[10px] font-black text-slate-950 shadow-xs animate-pulse"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <DialogTitle className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Notifications ({items.length})
          </DialogTitle>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="min-h-[36px] px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}
        </DialogHeader>

        <div
          role="region"
          aria-live="polite"
          aria-label="Notification list"
          className="max-h-[380px] overflow-y-auto space-y-2.5 py-2 pr-1"
        >
          {items.length === 0 ? (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs font-medium">
              No notifications yet. You are all caught up!
            </div>
          ) : (
            items.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-xl border transition-colors flex items-start justify-between gap-3 ${
                  notif.is_read
                    ? "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300"
                    : "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-slate-900 dark:text-slate-100"
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold leading-snug">{notif.title}</p>
                    {!notif.is_read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Unread" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                  </p>
                </div>

                {!notif.is_read && (
                  <button
                    type="button"
                    onClick={() => handleMarkAsRead(notif.id)}
                    aria-label={`Mark "${notif.title}" as read`}
                    className="min-h-[36px] px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Mark read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

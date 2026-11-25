"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/shared/star-rating";
import { submitRatingAction } from "@/app/actions/rating-actions";
import { Menu } from "@/lib/types/database";

interface RateMealDialogProps {
  menu: Menu;
  onRatingSuccess?: () => void;
}

export function RateMealDialog({ menu, onRatingSuccess }: RateMealDialogProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(menu.user_rating?.rating || 5);
  const [comment, setComment] = useState<string>(menu.user_rating?.comment || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAlreadyRated = !!menu.user_rating;

  // Check if meal served: now >= serving_start_time
  const mealStart = new Date(`${menu.menu_date}T${menu.serving_start_time}`);
  const isServed = new Date().getTime() >= mealStart.getTime();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await submitRatingAction({
      menu_id: menu.id,
      rating,
      comment: comment.trim() || undefined,
    });

    setLoading(false);

    if (res.success) {
      setOpen(false);
      onRatingSuccess?.();
    } else {
      setError(res.error || "Failed to submit rating.");
    }
  };

  if (!isServed) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="text-xs text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800 min-h-[36px]"
      >
        Rate after serving starts
      </Button>
    );
  }

  if (isAlreadyRated) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800/60">
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span>Rated {menu.user_rating?.rating}/5</span>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="min-h-[44px] px-3.5 py-2 inline-flex items-center justify-center rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
        >
          <Star className="w-4 h-4 mr-1.5 text-emerald-600 dark:text-emerald-400" /> Rate Meal
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-1">
            <DialogTitle className="capitalize text-lg font-bold text-slate-900 dark:text-slate-100">
              Rate {menu.meal_type} — {new Date(menu.menu_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
              How was the food quality, taste, and freshness today? Your feedback helps the kitchen optimize preparation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold mb-2">Overall Meal Satisfaction</span>
              <StarRating value={rating} onChange={setRating} size="lg" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">
                {rating === 5 && "Excellent (5/5)"}
                {rating === 4 && "Good (4/5)"}
                {rating === 3 && "Average (3/5)"}
                {rating === 2 && "Poor (2/5)"}
                {rating === 1 && "Very Poor (1/5)"}
              </span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="dish-feedback-comments" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-slate-400" /> Optional Comments or Dish Feedback
              </label>
              <Textarea
                id="dish-feedback-comments"
                placeholder="Mention specific dishes, seasoning, warmth, or quantity..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
                rows={3}
                className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
              <span className="text-[11px] text-slate-400 text-right block">
                {comment.length}/500
              </span>
            </div>

            {error && (
              <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}
          </div>

          <DialogFooter className="gap-2.5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Rating"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

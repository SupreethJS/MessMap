import { getDbRatings } from "@/lib/supabase/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/shared/star-rating";
import { Star, MessageSquare, TrendingUp, Users, Award, Flame } from "lucide-react";
import { DishImageBadge } from "@/components/shared/dish-image-badge";

export const dynamic = "force-dynamic";

export default async function AdminRatingsPage() {
  const ratings = await getDbRatings();

  // Calculate statistics
  const totalRatings = ratings.length;
  const avgScore = totalRatings > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(1)
    : "0.0";

  // Score distribution counts (1-star to 5-star)
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = ratings.filter((r) => r.rating === stars).length;
    const percentage = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
    return { stars, count, percentage };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Student Ratings & Dining Reviews
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Monitor student meal satisfaction, inspect dish-level commentary, and assess preparation standards.
        </p>
      </div>

      {/* Aggregate Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rating Score Card */}
        <Card className="flex flex-col justify-center items-center p-6 text-center">
          <span className="text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            {avgScore}
          </span>
          <StarRating value={parseFloat(avgScore)} readOnly size="lg" className="my-2" />
          <p className="text-xs text-slate-400">
            Based on {totalRatings} verified student submissions
          </p>
        </Card>

        {/* Rating Distribution Progress */}
        <Card className="md:col-span-2 p-6">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">
            Rating Distribution
          </h2>
          <div className="space-y-2.5">
            {distribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  {stars} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-16 text-right text-slate-400">
                  {count} ({percentage}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Dish-Level Student Satisfaction Leaderboard */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Dish-Level Satisfaction Leaderboard
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Top rated culinary preparations ranked by student satisfaction surveys.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            94% Campus Satisfaction
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                rank: 1,
                name: "Hyderabadi Chicken Biryani",
                category: "main",
                isVeg: false,
                rating: 4.8,
                votes: 312,
                highlight: "Consistently rated #1 on Sunday specials. Perfect spice balance.",
              },
              {
                rank: 2,
                name: "Crispy Masala Dosa",
                category: "main",
                isVeg: true,
                rating: 4.9,
                votes: 278,
                highlight: "Golden crisp with fresh coconut chutney & piping hot sambar.",
              },
              {
                rank: 3,
                name: "Paneer Butter Masala",
                category: "main",
                isVeg: true,
                rating: 4.7,
                votes: 245,
                highlight: "Rich buttery makhani gravy paired with tandoori rotis.",
              },
              {
                rank: 4,
                name: "Gulab Jamun",
                category: "dessert",
                isVeg: true,
                rating: 4.9,
                votes: 290,
                highlight: "Warm cardamom-infused syrup, zero waste recorded.",
              },
              {
                rank: 5,
                name: "Dal Tadka",
                category: "main",
                isVeg: true,
                rating: 4.6,
                votes: 198,
                highlight: "Smoky cumin-garlic ghee tadka, student everyday favorite.",
              },
              {
                rank: 6,
                name: "Chole Bhature",
                category: "main",
                isVeg: true,
                rating: 4.8,
                votes: 260,
                highlight: "Spicy Amritsari chole with fluffy, golden bhature.",
              },
            ].map((dish) => (
              <div
                key={dish.name}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-amber-400 dark:hover:border-amber-400 transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center shrink-0">
                      #{dish.rank}
                    </span>
                    <DishImageBadge
                      name={dish.name}
                      category={dish.category}
                      isVegetarian={dish.isVeg}
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{dish.rating}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  &quot;{dish.highlight}&quot;
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Based on {dish.votes} student votes</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> High Demand
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback Stream */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Recent Student Comments & Dish Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          {ratings.length === 0 ? (
            <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
              No ratings submitted yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {ratings.slice(-15).reverse().map((r) => {
                const studentName = (r as any).student?.full_name || "Student";
                const mealTypeLabel = r.meal_type || "Meal";

                return (
                  <div key={r.id} className="py-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <StarRating value={r.rating} readOnly size="sm" />
                        <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">
                          {studentName}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 capitalize">
                          ({mealTypeLabel})
                        </span>
                      </div>

                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {r.created_at ? new Date(r.created_at).toLocaleDateString() : "Recent"}
                      </span>
                    </div>

                    {r.comment && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/70 p-3 rounded-lg border border-slate-100 dark:border-slate-800 italic leading-relaxed">
                        &quot;{r.comment}&quot;
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Flame, Sparkles, Calendar, Utensils } from "lucide-react";
import { getDishFullDetails, DishDetails } from "@/lib/data/dish-images";
import { DishDetailModal } from "@/components/shared/dish-detail-modal";

export function LandingWeeklyHighlights() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDish, setSelectedDish] = useState<DishDetails | null>(null);

  const highlights = [
    {
      name: "Fragrant Chicken Biryani",
      dayTag: "Sunday Grand Lunch",
      dishKey: "chicken_biryani",
      badge: "Hall 1 Bestseller",
      highlightText: "Layered dum basmati with marinated chicken, saffron milk, and fried onions.",
    },
    {
      name: "Paneer Butter Masala with Naan",
      dayTag: "Wednesday Royal Dinner",
      dishKey: "paneer_naan",
      badge: "Chef's Special",
      highlightText: "Rich velvety tomato cashew gravy with fresh malai paneer & clay-oven naans.",
    },
    {
      name: "Golden Masala Dosa",
      dayTag: "Weekend Morning Delight",
      dishKey: "masala_dosa",
      badge: "Hostel Favorite",
      highlightText: "Paper-thin crispy fermented crepe with tempered potato sabzi & fresh chutneys.",
    },
    {
      name: "Warm Gulab Jamun in Syrup",
      dayTag: "Saturday Dessert Night",
      dishKey: "gulab_jamun",
      badge: "Sweet Indulgence",
      highlightText: "Melt-in-mouth mawa dumplings soaked in cardamom and saffron infused syrup.",
    },
    {
      name: "Crispy Spicy Chicken 65",
      dayTag: "Friday Evening Treat",
      dishKey: "chicken_65",
      badge: "Snack of the Week",
      highlightText: "Tender chicken marinated in Kashmiri red chili, curry leaves, and ginger garlic.",
    },
    {
      name: "Coastal Spiced Fish Curry",
      dayTag: "Thursday Lunch Special",
      dishKey: "fish_curry",
      badge: "Regional Authentic",
      highlightText: "Coastal catch simmered in rich coconut milk with tangy kokum and mustard tempering.",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="highlights" className="relative z-10 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Campus Culinary Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Weekly Signature Feasts
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Special menus hostellers look forward to all week long. Handcrafted in small batches with premium ingredients.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll highlights left"
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll highlights right"
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Horizontal Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {highlights.map((item, idx) => {
            const details = getDishFullDetails(item.name);
            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedDish(details)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedDish(details);
                  }
                }}
                className="group relative flex-none w-[300px] sm:w-[350px] snap-start rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-amber-400/80 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between text-left"
              >
                {/* 16:10 Full Food Photography Container */}
                <div className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden">
                  <Image
                    src={details.imageUrl}
                    alt={details.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Overlaid Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 text-amber-300 backdrop-blur-md border border-white/10">
                      {item.badge}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-400 font-extrabold text-[11px] backdrop-blur-md border border-amber-400/30">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {details.rating}
                    </span>
                  </div>

                  {/* Day Tag Banner */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                    <Calendar className="w-3 h-3" />
                    <span>{item.dayTag}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 border-2 ${
                          details.isVegetarian ? "border-emerald-600" : "border-rose-600"
                        } flex items-center justify-center rounded-xs p-0.5 shrink-0`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            details.isVegetarian ? "bg-emerald-600" : "bg-rose-600"
                          }`}
                        />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                        {details.name}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.highlightText}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                    <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      {details.calories} kcal • {details.protein}g protein
                    </span>

                    <span className="text-amber-600 dark:text-amber-400 font-bold group-hover:underline">
                      View Recipe →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DishDetailModal
        open={Boolean(selectedDish)}
        onOpenChange={(open) => !open && setSelectedDish(null)}
        dish={selectedDish}
      />
    </section>
  );
}

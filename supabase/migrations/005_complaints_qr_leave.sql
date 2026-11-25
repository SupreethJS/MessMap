-- 005_complaints_qr_leave.sql: QR Meal Check-Ins, Hostel Leaves/Rebates & Complaint Enhancements

-- 1. MEAL CHECK-INS TABLE (QR Scan & Manual Roll Number Verification)
CREATE TABLE IF NOT EXISTS public.meal_check_ins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_id UUID NOT NULL REFERENCES public.menus(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_roll_number TEXT,
    student_name TEXT,
    scanned_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    method TEXT NOT NULL DEFAULT 'qr_scan' CHECK (method IN ('qr_scan', 'manual_roll')),
    meal_type TEXT NOT NULL,
    menu_date DATE NOT NULL,
    CONSTRAINT uq_meal_checkin UNIQUE (menu_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_meal_checkins_menu ON public.meal_check_ins (menu_id);
CREATE INDEX IF NOT EXISTS idx_meal_checkins_student ON public.meal_check_ins (student_id);
CREATE INDEX IF NOT EXISTS idx_meal_checkins_date ON public.meal_check_ins (menu_date, meal_type);

-- Enable RLS for meal check-ins
ALTER TABLE public.meal_check_ins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students view own checkins or admins view all" ON public.meal_check_ins;
CREATE POLICY "Students view own checkins or admins view all"
ON public.meal_check_ins FOR SELECT TO authenticated
USING (student_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admins can insert meal checkins" ON public.meal_check_ins;
CREATE POLICY "Admins can insert meal checkins"
ON public.meal_check_ins FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

-- 2. HOSTEL LEAVES & REBATE TABLE
CREATE TABLE IF NOT EXISTS public.hostel_leaves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    days_count INTEGER NOT NULL CHECK (days_count > 0),
    estimated_rebate NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'Approved' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_hostel_leaves_student ON public.hostel_leaves (student_id);
CREATE INDEX IF NOT EXISTS idx_hostel_leaves_dates ON public.hostel_leaves (start_date, end_date);

-- Enable RLS for hostel leaves
ALTER TABLE public.hostel_leaves ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students view own leaves or admins view all" ON public.hostel_leaves;
CREATE POLICY "Students view own leaves or admins view all"
ON public.hostel_leaves FOR SELECT TO authenticated
USING (student_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Students insert own leaves" ON public.hostel_leaves;
CREATE POLICY "Students insert own leaves"
ON public.hostel_leaves FOR INSERT TO authenticated
WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "Admins update hostel leaves" ON public.hostel_leaves;
CREATE POLICY "Admins update hostel leaves"
ON public.hostel_leaves FOR UPDATE TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. COMPLAINTS TABLE ENHANCEMENTS (Rebate amount and optional remarks)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'complaints' 
        AND column_name = 'rebate_amount'
    ) THEN
        ALTER TABLE public.complaints ADD COLUMN rebate_amount NUMERIC(10,2) DEFAULT 0.00;
    END IF;
END $$;

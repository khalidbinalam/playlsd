// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zgshkeikjpfaqgwdtvbt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnc2hrZWlranBmYXFnd2R0dmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjAzNjMsImV4cCI6MjA1OTUzNjM2M30.-c2erM1KSMvukkJV0SM276MHrwcxTsH3LsBsY22C6xY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
import { createClient } from '@supabase/supabase-js';

import { config } from '../config';

const supabaseUrl = config.supabase.supabaseUrl;
const supabaseKey = config.supabase.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

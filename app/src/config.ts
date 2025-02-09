export const config = {
  apiBaseURI: import.meta.env.VITE_API_BASE_URI,

  supabase: {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY
  }
};

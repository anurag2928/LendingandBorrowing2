// filepath: src/supabaseClient.ts
// const SUPABASE_URL = 'https://eynklmuawasnbqfuyvgc.supabase.co'; // Replace with your Supabase URL
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bmtsbXVhd2FzbmJxZnV5dmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNTIzODIsImV4cCI6MjA2MDkyODM4Mn0.RJYa6TLA-WXoHyDouoDWBJ1fqeAKBXmjeXZnWFKZOPg'; // Replace with your Supabase anon key
import { createClient } from '@supabase/supabase-js';

// Get environment variables
let SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
let SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// console.log('Supabase URL (processed):', SUPABASE_URL);
// console.log('Supabase Anon Key (processed):', SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
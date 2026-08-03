const SUPABASE_URL =
'https://ofyblajmehnwbzciojbv.supabase.co';

const SUPABASE_ANON_KEY =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9meWJsYWptZWhud2J6Y2lvamJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NDUwMjksImV4cCI6MjEwMTIyMTAyOX0.Ej_l3ZVGhgU7GnhNir-fbblH8_b4p73o1-jk9dVPjnc';

window.supabaseClient =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
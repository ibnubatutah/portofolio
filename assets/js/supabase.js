const SUPABASE_URL =
'https://ofyblajmehnwbzciojbv.supabase.co';

const SUPABASE_ANON_KEY =
'sb_publishable_oUim_422vPUo8dJ3-K5ZfA_n5lqoN8q';

window.supabaseClient =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
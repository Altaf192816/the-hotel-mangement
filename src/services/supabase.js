/**
 *! Backend using supabase
 * TODO 1 :- First create table in supabase and insert column for dummy data
 * TODO 2:- npm install @supabase/supabase-js
 * TODO 3:- Copy below code in supabase.js
    import { createClient } from '@supabase/supabase-js';
    const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
 * TODO 4:- Copy Read all rows for that table in differnt file(apiCabin.js) eg:-for Selecting or reading cabin row
    let { data: cabins, error } = await supabase
  .from('cabins')
  .select('*')
 * TODO 5 :- Enable Authentication by click on Authentication > policies then click on New Policy for all users.Insert(for creating),Delete(for deleting),Update(for updating),Select(for reading) rows
 * TODO 6:- In that file create a async function , Paste the above code and return data. Now data is ready to use.
 * TODo 7 :- For storing photo click on storage then click on new bucket name it and enable public bucket.Drag and drop the photo
    */

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
//TODO-->Both supabaseUrl and spabaseKey can get from project settings > API
export const supabaseUrl = "https://hqxftpfzhpbjkjpvnrxy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeGZ0cGZ6aHBiamtqcHZucnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTg1NTEsImV4cCI6MjA4NzU3NDU1MX0.cOU7QKXtp0ok947s5_47waRDcdC-o4OnLLJvAkPsogk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

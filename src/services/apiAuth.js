import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data; //this data get store in LocalStorage
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  //this is used to get data session data from localStorage
  const { data: session } = await supabase.auth.getSession(); // The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser(); //if  current  user exist getting again from supabase

  if (error) throw new Error(error.message);
  return data?.user;
}
export async function updateCurrentUser({ password, fullName, avatar }) {
  //1 Update Password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2 Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random() + 1}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //3 Update avatar in the user
  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
      },
    });
  if (updatedUserError) throw new Error(updatedUserError.message);
  return updatedUser;
}

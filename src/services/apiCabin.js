import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabin() {
  //below code would be copy from API docs > cabins read all rows
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("Cabins could not be loaded");
    toast.error("Cabins could not be loaded");
    throw new Error(error);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl); //if newCabin.image string has start with https://nvmlaunuhckcppjewalt.supabase.co then we already have imagePath

  //todo--> Image format
  //https://nvmlaunuhckcppjewalt.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = !hasImage && `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  console.log(imageName);

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; //image path should match with image format

  //1 Creating/editing cabin in the table
  let query = supabase.from("cabins");

  //A Creating
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); //insert accpet array of object

  //B Editting
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id); //update accept only object and eq aceept the table row name and which row has to be updated

  const { error, data } = await query.select().single();

  if (error) {
    console.log("Cabins could not be updated");
    throw new Error("Cabins could not be updated");
  }

  //2 Uploading image in the bucket
  if (hasImage) return data;//if already have image then we don't upload the image to storage bucket

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image); //uplaoad accept image name and image file

  //3 deleting the cabin if there is some error in uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Canin image could not be uploaded and cabins could not be deleted"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("Cabins could not be deleted");
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

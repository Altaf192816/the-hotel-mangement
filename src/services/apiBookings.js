import toast from "react-hot-toast";
import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constant";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  //getting only specific columns
  let query = supabase.from("bookings").select(
    "id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,cabins(name),guests(fullName,email)",
    { count: "exact" } //to get the length of the array
  );
  //Filter
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);
  // .eq("status","checked-in");//eq fetch only data that have status equal to checked-in

  //Sorting
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc", //ascending : true (give data in ascending form)
    });

  //Pagination
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  if (page) query = query.range(from, to); //from = 0 to 9 in first page

  const { data, error, count } = await query;

  if (error) {
    console.log("bookings could not be loaded");
    toast.error("bookings could not be loaded");
    throw new Error(error);
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date to current date. Useful to get bookings created in the last 30 days, for example.
//date: ISOString
export async function getBookingsAfterDateTillToday(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice") //consider today is 8 jan therefore if filter give 7 date = 8 -7= 1 jan
    .gte("created_at", date) //greater then  1 jan will return
    .lte("created_at", getToday({ end: true })); //lesser than today(8 jan) will return
  //therefore we get bookings from 1 jan to 8 jan(included)

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDateTillToday(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at"); //Order the query result by column

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

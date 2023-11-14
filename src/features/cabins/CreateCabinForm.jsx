import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";



function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);//checking if we editing or creating cabin

  /**
   * getValues -: Give all the input values in the form 
   * reset :- reset the form
   * register :- register the element in react-hook-form
   * handleSubmit :- handle from and accept two function first is form sumbit sucessfully and second is form has some error 
   */
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editValues,
  });

  const { errors } = formState;//give object of form errors

  const queryClient = useQueryClient();

  //mutation hook for creating cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin is sucessfully created");//toast is from react-toast
      queryClient.invalidateQueries({ queryKey: ["cabins"] });//imediatiley invalidating data after creating and editing
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  //mutation hook for editing cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),//here mutation function accepting to parameter
    onSuccess: () => {
      toast.success("Cabin sucessfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];//if data.image is string then we simply pass as perameter but a file then we get the first element of  data.image 

    if (isEditSession) editCabin({ newCabin: { ...data, image }, id: editId });
    else createCabin({ ...data, image });
  }

  function onError(error) {
    console.log(error);
  }

  const isWorking = isCreating || isEditing;//if creating and editing is happening then disbaled all the button

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This feild is requried",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This feild is requried",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This feild is requried",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than price",//value paeameter has current value of this input
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for cabin"}
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This feild is required",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Please uploaded the cabin photo",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

import React, { useState } from "react";
import { FormSchema, FormSchemaType, InputFileds } from "@/types/global";
import { serviceOptions } from "./_data";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerDemoProps {
  onSelectDate: (date: Date) => void;
  selectedDate: Date | undefined;
}

const DatePickerDemo: React.FC<DatePickerDemoProps> = ({
  onSelectDate,
  selectedDate,
}: DatePickerDemoProps): JSX.Element => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => onSelectDate(date as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const AddClient = () => {
  const [selectedVal, setSelectedVal] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reviews, setReviews] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
    setValue("subStatus", date.toISOString());
  };

  const addReview = () => {
    setReviews([...reviews, ""]);
  };

  const updateReview = (index: number, value: string) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = value;
    setReviews(updatedReviews);
  };

  const removeReview = (index: number) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = {
      ...data,
      remarks: reviews,
    };
    reset();

    console.log(formData);
  };

  return (
    <form
      className="md:w-8/12 gap-4 mx-auto border-2 border-muted p-3 rounded-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      {InputFileds.map(({ name, placeholder }) => (
        <div key={name}>
          <Input placeholder={placeholder} {...register(name)} />
          {errors[name] && <span>{errors[name]?.message}</span>}
        </div>
      ))}

      <div className="flex flex-col gap-4">
        <div className="custom-select">
          <select
            {...register("status")}
            className="w-full .select-dropdown "
            onChange={(e) => setSelectedVal(e.target.value)}
          >
            <option value="Status">Status</option>
            <option value="Call Back">CallBack</option>
            <option value="Interested">Intersted</option>
            <option value="Not Interested">Not Intersted</option>
            <option value="Demo time">Demo Time</option>
            <option value="Follow Up Next Month">Flexible Next Month</option>
          </select>
        </div>

        {selectedVal === "Call Back" && (
          <DatePickerDemo
            onSelectDate={onSelectDate}
            selectedDate={selectedDate}
          />
        )}
        {selectedVal === "Follow Up Next Month" && (
          <DatePickerDemo
            onSelectDate={onSelectDate}
            selectedDate={selectedDate}
          />
        )}

        {selectedVal === "Interested" && (
          <select {...register("subStatus")}>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {selectedVal === "Not Interested" && (
          <input type="hidden" {...register("subStatus", { value: null })} />
        )}
        {selectedVal === "Demo time" && (
          <select {...register("subStatus")} id="demoType">
            <option value="Physical">Physical</option>
            <option value="Virtual">Virtual</option>
          </select>
        )}
      </div>

      {reviews.map((review, index) => (
        <div key={index} className="flex flex-row items-center gap-4 mt-2">
          <Input
            placeholder="Review"
            value={review}
            onChange={(e) => updateReview(index, e.target.value)}
          />
          <Button type="button" onClick={() => removeReview(index)}>
            Remove
          </Button>
        </div>
      ))}

      <Button type="button" className="w-full my-2" onClick={addReview}>
        Add Remark
      </Button>
      <br />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddClient;

"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MY_FAKE_CONTRACTS } from "./fake-contacts-data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function YourContractsSection() {
  const [addContractDialogIsOpen, setAddContractDialogIsOpen] =
    useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleAddContractClick = () => {
    setAddContractDialogIsOpen(!addContractDialogIsOpen);
  };

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <h1 className="text-xl font-bold">Your Contracts</h1>
      <Dialog
        open={addContractDialogIsOpen}
        onOpenChange={handleAddContractClick}
      >
        <DialogContent>
          <div className="flex flex-col gap-[0.5rem]">
            <DialogTitle>Contract Details</DialogTitle>
            <Input placeholder="Contract Title" />

            <div className="flex gap-[0.5rem] w-full">
              <Popover>
                <PopoverTrigger className="w-full">
                  <Button variant="outline" className="flex w-full">
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger className="w-full">
                  <Button variant="outline" className="w-full">
                    {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Input placeholder="Contract Amount" />
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <DialogTitle>Contract Holder Details</DialogTitle>
            <Input placeholder="Name" />
            <Input placeholder="Contact Number" />
            <Input placeholder="Email" />
          </div>
        </DialogContent>
      </Dialog>

      <Card className="flex gap-[1rem] flex-wrap p-[1rem]">
        <Card className="flex flex-col justify-center items-center p-[1rem] hover:border-slate-500">
          <Image
            src="https://placehold.co/141x200.png"
            height={200}
            width={141}
            alt="Add contract placeholder"
            className="mb-[1rem]"
            onClick={handleAddContractClick}
          />
          <div>
            <CardTitle>Add Contract</CardTitle>
          </div>
        </Card>

        {MY_FAKE_CONTRACTS.map((contract, index) => {
          const {
            title,
            startDateString,
            endDateString,
            holderName,
            imageUrl,
          } = contract;

          const key = `${contract}-${index}`;

          return (
            <Card
              className="flex flex-col justify-center items-center p-[1rem] hover:border-black"
              key={key}
            >
              <Image
                src={imageUrl}
                height={200}
                width={141}
                alt={title}
                className="mb-[1rem]"
              />
              <div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  {startDateString} - {endDateString}
                </CardDescription>
                <CardDescription>{holderName}</CardDescription>
              </div>
            </Card>
          );
        })}
      </Card>
    </section>
  );
}

import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function ContractCategoriesSection() {
  const FAKE_CATEGORIES = [
    {
      title: "#RealEstate",
      number: 10,
    },
    {
      title: "#Services",
      number: 15,
    },
    {
      title: "#Maintenance",
      number: 8,
    },
    {
      title: "#Consulting",
      number: 12,
    },
    {
      title: "#Supplies",
      number: 5,
    },
  ];

  return (
    <section className="flex flex-col gap-[0.5rem]">
      <h1 className="text-xl font-bold">Contract Categories</h1>

      <Card className="p-[1rem]">
        <div className="flex gap-[1rem]">
          {FAKE_CATEGORIES.map((category, index) => {
            const { title, number } = category;

            const key = `${title}-${index}`;

            return (
              <Card
                className="p-[1rem] transition-opacity hover:opacity-50"
                key={key}
              >
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{number} Contracts</CardDescription>
              </Card>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

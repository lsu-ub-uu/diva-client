interface DateProps {
  date?: {
    year: {
      value: string;
    };
    month?: {
      value: string;
    };
    day?: {
      value: string;
    };
  };
}

export const Date = ({ date }: DateProps) => {
  if (!date) {
    return null;
  }

  const { year, month, day } = date;

  return (
    <span>
      {year.value}
      {month && `-${month.value}`}
      {day && `-${day.value}`}
    </span>
  );
};

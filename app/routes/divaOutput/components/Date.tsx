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
    hh?: {
      value: string;
    };
    mm?: {
      value: string;
    };
  };
}

export const Date = ({ date }: DateProps) => {
  if (!date) {
    return null;
  }

  const { year, month, day, hh, mm } = date;

  const dateString = [year.value, month?.value, day?.value]
    .filter(Boolean)
    .join('-');

  const timeString = [hh?.value, mm?.value].filter(Boolean).join(':');

  const isoDateTime = [dateString, timeString].filter(Boolean).join('T');
  const formattedDateTime = [dateString, timeString].filter(Boolean).join(' ');

  return <time dateTime={isoDateTime}>{formattedDateTime}</time>;
};

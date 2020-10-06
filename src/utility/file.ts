const slugname = (slug: string) => slug.replace(/\s+/g, "-");

const tokenExpireDate = (time: number = 1): Date => {
  const date = new Date(Date.now());
  date.setHours(date.getHours() + time);
  return date;
};

// export
export {
  slugname,
  tokenExpireDate,
};

export default function formDataToJson(formData: FormData) {
  return Array.from(formData.keys()).reduce<Record<string, string | string[]>>(
    (acc, key) => {
      const cleanKey = key.replace("[]", "");
      const value = formData.get(key);

      if (key.endsWith("[]")) {
        return {
          ...acc,
          [cleanKey]: acc[cleanKey]
            ? [...(acc[cleanKey] as string[]), value as string]
            : [value as string],
        };
      }

      return {
        ...acc,
        [cleanKey]: value as string,
      };
    },
    {}
  );
}

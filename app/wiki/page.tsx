import { RedirectType, redirect } from "next/navigation";
import React from "react";

type Props = {};

const Wiki = (props: Props) => {
  return redirect("/wiki/about", RedirectType.push);
};

export default Wiki;

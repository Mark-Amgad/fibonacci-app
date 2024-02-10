import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Headers/header";
import InputField from "@/components/InputFields/inputField";
import SubmitButton from "@/components/Buttons/SubmitButton";
import SimpleList from "@/components/Lists/SimpleList";
import { use, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const BE = `http://localhost:8000`;
type Value = {
  index: number;
  value: number;
};

export default function Home() {
  const [indexes, setIndexes] = useState<number[]>([]);

  const [values, setValues] = useState<Value[]>([]);

  useEffect(() => {
    fetch(`${BE}/indexes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIndexes(data);
      })
      .catch((err) => {
        console.log("Error in fetching Indexes data");
      });
  }, []);

  useEffect(() => {
    fetch(`${BE}/values`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setValues(data);
      })
      .catch((err) => {
        console.log("Error in fetching Values data");
      });
  }, []);

  return (
    <div>
      <Header title="Fib Calculator" />

      <div className="flex flex-col items-center gap-5">
        <div className="flex justify-center items-center gap-5 mt-16">
          <InputField
            label="Enter Your value"
            placeholder="Please Enter a number"
          />
          <SubmitButton label="Submit" onClick={() => {}} />
        </div>

        <SimpleList
          title="Values I have seen:"
          listItems={indexes.map((val) => String(val))}
        />

        <SimpleList
          title="Calculated Values:"
          listItems={values.map((singleVal: Value) => {
            return `For Index ${singleVal.index} , I Calculated ${singleVal.value}`;
          })}
        />
      </div>
    </div>
  );
}

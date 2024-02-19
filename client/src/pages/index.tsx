import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Headers/header";
import InputField from "@/components/InputFields/inputField";
import SubmitButton from "@/components/Buttons/SubmitButton";
import SimpleList from "@/components/Lists/SimpleList";
import { ChangeEvent, FormEvent, use, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

let BE = process.env.NEXT_PUBLIC_BE || "http://localhost:8500";
type Value = {
  index: number;
  value: number;
};

export default function Home() {
  const [indexes, setIndexes] = useState<number[]>([]);

  const [values, setValues] = useState<Value[]>([]);

  const [newIndex, setNewIndex] = useState<string>("");

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

  const handleSubmitIndex = async () => {
    if (Number(newIndex)) {
      try {
        const response = await fetch(`${BE}/indexes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index: Number(newIndex),
          }),
        });

        if (response.ok) {
          console.log(
            "Index added successfully, Refresh to see the updated result."
          );
        }
      } catch (err) {
        console.log("Error in post a new Index");
      }
    }
    setNewIndex("");
  };

  const handleChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= 0) {
      setNewIndex(e.target.value);
    }
  };

  return (
    <div>
      <Header title="Fib Calculator" />

      <div className="flex flex-col items-center gap-5">
        <div className="flex justify-center items-center gap-5 mt-16">
          <InputField
            label="Enter Your value"
            placeholder="Please Enter a number"
            value={newIndex}
            onChange={handleChangeIndex}
          />
          <SubmitButton label="Submit" onClick={handleSubmitIndex} />
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

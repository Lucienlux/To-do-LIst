'use client'
import Image from "next/image";
import Header from "@/components/Header";
import Todolist from "@/components/Todolist";

export default function Home() {
  return (
    <div>
      <Header />
      <Todolist />
    </div>
  );
}

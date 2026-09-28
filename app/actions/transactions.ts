"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createTransaction(formData: FormData) {
  const description = formData.get("description")?.toString();
  const amount = Number(formData.get("amount"));
  const type = formData.get("type")?.toString();

  if (!description || !amount || !type) {
    throw new Error("Preencha todos os campos.");
  }

  if (type !== "income" && type !== "expense") {
    throw new Error("Tipo de transação inválido.");
  }

  const { error } = await supabase
    .from("transactions")
    .insert({
      description,
      amount,
      type,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}
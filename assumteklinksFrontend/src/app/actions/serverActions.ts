"use server";

import axios from "axios"; // Importando o Axios
import { cookies, headers } from "next/headers";


export async function handleEmpresa(IdEmpresa:string) {
  try {
    const response = await axios.post("http://localhost:3333/empresa", {
      id: IdEmpresa
    });

    const empresa = response.data

    console.log(empresa)
    return { empresa }


  } catch (err: any) {
    console.log("Erro ::::", err.data)
    throw new Error(err.message);
  }
}

export async function handleEditDescriptionEmpresa(id: string, description: string) {
  try {
    const response = await axios.post("http://localhost:3333/editcompany", {
      id: id,
      description: description,
    });

    const empresa = response.data;

    console.log(empresa);
    return { empresa };
  } catch (err: any) {
    console.error("Erro ::::", err.response?.data || err.message);
    throw new Error(err.message);
  }
}

export async function handleEditLinksEmpresa(id: string,instagram: string, linkedin: string, whatsapp: string, email: string) {
  try {
    const response = await axios.post("http://localhost:3333/editcompany", {
      id: id,
      instagram,
      linkedin,
      whatsapp,
      email,
    });

    const empresa = response.data;

    console.log(empresa);
    return { empresa };
  } catch (err: any) {
    console.error("Erro ::::", err.response?.data || err.message);
    throw new Error(err.message);
  }
}

export async function handleDeleteLink(IdEmpresa: string) {
  try {
    const response = await axios.post("http://localhost:3333/linksdelete", {
      linkId: IdEmpresa,
    });

    const empresa = response.data;

    console.log(empresa);
    return { empresa };
  } catch (err: any) {
    console.error("Erro ::::", err.response?.data || err.message);
    throw new Error(err.message);
  }
}

export async function handleCreatLink(IdEmpresa: string, title: string, logo: string, description: string, url: string, order: number) {
  try {
    const response = await axios.post("http://localhost:3333/links", {
      companyId: IdEmpresa,
      title: title,
      logo: logo,
      description: description,
      url: url,
      icon_url: "",
      order: order
    });

    const empresa = response.data;

    console.log(empresa);
    return { empresa };
  } catch (err: any) {
    console.error("Erro ::::", err.response?.data || err.message);
    throw new Error(err.message);
  }
}


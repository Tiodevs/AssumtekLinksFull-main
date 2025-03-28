'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { IdEmpresaComponent } from "@/app/components/IdEmpresaComponent";
import { handleCreatLink } from "@/app/actions/serverActions";

export default function FormCard() {
  const IdEmpresa = decodeURIComponent(IdEmpresaComponent() as string).trim();

  const [link, setLink] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [imagem, setImagem] = useState<string>("");
  const [order, setOrder] = useState<number>(1); // Valor inicial padrão é 1

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await handleCreatLink(IdEmpresa, titulo, imagem, descricao, link, order);
      alert('Link criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar o link.');
    }
  };

  return (
    <div className={styles.body}>
      <header>
        <div className={styles.bio}>
          <Image src="/LogoAssumteck.png" alt="Logo Assumtek" width={100} height={100} />
          <div>
            <h1>Painel de ADM</h1>
            <p>Configurações</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="link"
          placeholder="Link"
          className={styles.input}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          className={styles.input}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          className={styles.input}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="text"
          name="imagem"
          placeholder="Imagem"
          className={styles.input}
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
        />
        <input
          type="number" // Use type="number" para aceitar apenas números
          name="order"
          placeholder="Ordem"
          className={styles.input}
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))} // Converta para número
        />
        <button className={styles.btn} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
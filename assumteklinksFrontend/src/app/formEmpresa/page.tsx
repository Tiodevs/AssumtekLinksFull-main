'use client'; // Adicione essa linha no topo do seu arquivo

import { useState } from "react";
import Image from "next/image";
import axios from "axios"; // Importando o Axios
import styles from "./page.module.css";

export default function Home() {
  // Definindo estados para o formulário e feedback de erro/sucesso
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    subname: "",
    instagram: "",
    linkedin: "",
    whatsapp: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Função para capturar os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para enviar o formulário com Axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página seja recarregada ao submeter

    setLoading(true); // Inicia o estado de carregamento
    setError(null); // Reseta o erro
    setSuccess(false); // Reseta a mensagem de sucesso

    try {
      const response = await axios.post("http://localhost:3333/panel", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('Resposta da API:', response.data);
      setSuccess(true);
    } catch (error:any) {
      console.error("Erro de rede:", error);
      if (error.response) {
        console.error("Código de status:", error.response.status);
        console.error("Dados da resposta:", error.response.data);
      } else if (error.request) {
        console.error("Nenhuma resposta recebida:", error.request);
      } else {
        console.error("Erro ao configurar a solicitação:", error.message);
      }
      setError("Ocorreu um erro ao enviar os dados.");
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
    
  };

  return (
    <div className={styles.body}>
      <header>
        <div className={styles.bio}>
          <Image
            src="/LogoAssumteck.png"
            alt="Logo Assumtek"
            width={100}
            height={100}
          />
          <div>
            <h1>Painel de ADM</h1>
            <p>Configurações</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nome da empresa"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          className={styles.input}
          value={formData.logo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          className={styles.input}
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subname"
          placeholder="Subname"
          className={styles.input}
          value={formData.subname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          className={styles.input}
          value={formData.instagram}
          onChange={handleChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          className={styles.input}
          value={formData.linkedin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="Whatsapp"
          className={styles.input}
          value={formData.whatsapp}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        
        <button className={styles.btn} type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Dados enviados com sucesso!</p>}
    </div>
  );
}

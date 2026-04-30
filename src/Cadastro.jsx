import React, { useState } from 'react';
import { auth, db } from './firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Cadastro = () => {
  const [tipoUsuario, setTipoUsuario] = useState('cliente'); // 'cliente' ou 'loja'
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estados para Cliente
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [carroModelo, setCarroModelo] = useState('');
  const [carroAno, setCarroAno] = useState('');
  const [ultimaTroca, setUltimaTroca] = useState('');
  const [marcaAtual, setMarcaAtual] = useState('');

  // Estados para Loja
  const [nomeLoja, setNomeLoja] = useState('');
  const [endereco, setEndereco] = useState('');

  // --- ACRESCIMO: FUNÇÃO DE GEOLOCALIZAÇÃO ---
  const buscarCoordenadas = async (end) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(end)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error("Erro na geocodificação:", error);
      return null;
    }
  };
  // ------------------------------------------

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      // --- ACRESCIMO: BUSCA DE COORDENADAS PARA LOJA ---
      let coordenadas = null;
      if (tipoUsuario === 'loja') {
        coordenadas = await buscarCoordenadas(endereco);
        if (!coordenadas) {
          alert("Aviso: Não conseguimos validar a localização exata deste endereço, mas prosseguiremos com o cadastro.");
        }
      }
      // ------------------------------------------------

      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      let dadosPerfil = {
        uid: user.uid,
        email: email,
        tipo: tipoUsuario,
        dataCadastro: new Date().toISOString()
      };

      if (tipoUsuario === 'cliente') {
        dadosPerfil.perfil = {
          nome, idade, sexo,
          veiculo: { modelo: carroModelo, ano: carroAno },
          historico: { ultimaTroca, marcaAtual }
        };
      } else {
        dadosPerfil.perfil = {
          nomeLoja,
          endereco,
          // --- ACRESCIMO: SALVANDO AS COORDENADAS ---
          coordenadas: coordenadas 
          // -----------------------------------------
        };
      }

      await setDoc(doc(db, "usuarios", user.uid), dadosPerfil);
      alert("Cadastro realizado com sucesso!");
      
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro no cadastro: " + error.message);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Criar Nova Conta</h2>
      
      <div className="tipo-selector">
        <button 
          className={tipoUsuario === 'cliente' ? 'active' : ''} 
          onClick={() => setTipoUsuario('cliente')}
        >
          Sou Cliente
        </button>
        <button 
          className={tipoUsuario === 'loja' ? 'active' : ''} 
          onClick={() => setTipoUsuario('loja')}
        >
          Sou Loja
        </button>
      </div>

      <form onSubmit={handleCadastro}>
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required />

        {tipoUsuario === 'cliente' ? (
          <div className="campos-cliente">
            <input type="text" placeholder="Nome Completo" onChange={(e) => setNome(e.target.value)} />
            <input type="number" placeholder="Idade" onChange={(e) => setIdade(e.target.value)} />
            <select onChange={(e) => setSexo(e.target.value)}>
              <option value="">Sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            <h4>Dados do Veículo</h4>
            <input type="text" placeholder="Modelo do Carro (ex: Civic)" onChange={(e) => setCarroModelo(e.target.value)} />
            <input type="number" placeholder="Ano do Carro" onChange={(e) => setCarroAno(e.target.value)} />
            <input type="month" placeholder="Mês/Ano da última troca" onChange={(e) => setUltimaTroca(e.target.value)} />
            <input type="text" placeholder="Marca da bateria atual" onChange={(e) => setMarcaAtual(e.target.value)} />
          </div>
        ) : (
          <div className="campos-loja">
            <input type="text" placeholder="Nome da Loja" onChange={(e) => setNomeLoja(e.target.value)} />
            <input type="text" placeholder="Endereço Completo" onChange={(e) => setEndereco(e.target.value)} />
          </div>
        )}

        <button type="submit">Finalizar Cadastro</button>
      </form>
    </div>
  );
};

export default Cadastro;


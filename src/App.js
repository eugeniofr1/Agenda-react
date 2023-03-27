import './App.css';
import {useEffect, useState} from 'react';
import Contatos from './Components/contatos/Contatos';
import Formulario from './Components/formulario/Formulario';

function App() {

  const contato = {
    id : 0,
    nome : '',
    telefone : '',
    email : ''
  }


  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [contatos, setContatos] = useState([]);
  const [objContatos, setObjContatos] = useState(contato);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
    .then(resposta => resposta.json())
    .then(resposta_convertida => setContatos(resposta_convertida))

  }, []);

  const aoDigitar = (e) => {
    setObjContatos({...objContatos, [e.target.name]:e.target.value});
  }


  //Cadastrar contato
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar',{
      method: 'post',
      body:JSON.stringify(objContatos),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        
        if(retorno_convertido.mensagem !== undefined){
          alert(retorno_convertido.mensagem);
        }else{
          setContatos([...Contatos, retorno_convertido])
          alert('Contato salvo!')
          limparFormulario();
        }
      })
  }

  //Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar',{
      method: 'put',
      body:JSON.stringify(objContatos),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        
        if(retorno_convertido.mensagem !== undefined){
          alert(retorno_convertido.mensagem);
        }else{
          
          alert('Contato alterado!')

          //Cópia vetor de contatos
        let vetorTemp = [...contatos];

        //Índice
        let indice = vetorTemp.findIndex((p) =>{
            return p.codigo === objContatos.id;
        });
        

        //Alterar produto do vetor temporario
        vetorTemp[indice, 1] = objContatos;

        //Atualizar o vetor de contatos
        setContatos(vetorTemp);

          limparFormulario();
        }
      })
  }


  //Remover
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objContatos.id,{
      method: 'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        //Mensagem
        alert(retorno_convertido.mensagem);
        
        //Cópia vetor de contatos
        let vetorTemp = [...contatos];

        //Índice
        let indice = vetorTemp.findIndex((p) =>{
            return p.codigo === objContatos.id;
        });
        

        //Remover produto do vetor temporario
        vetorTemp.splice(indice, 1);

        //Atualizar o vetor de contatos
        setContatos(vetorTemp);

        limparFormulario();
      })
  }

  //Limpar formulário
  const limparFormulario = () =>{
    setObjContatos(contato);
    setBtnCadastrar(true)
  }

  //Selecionar produto
  const selecionarProduto = (indice) => {
    setObjContatos(contatos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <h1 className='titulo'>Minha agenda</h1>
      
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objContatos} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Contatos vetor={contatos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;

function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}){
    return(
    <form>
        <input type='text' value={obj.nome} name="nome" onChange={eventoTeclado} placeholder="Nome do contato" className='form-control'/>
        <input type='text' value={obj.telefone} name="telefone" onChange={eventoTeclado} placeholder="(XX) XXXXX-XXXX" className='form-control'/>
        <input type='text' value={obj.email} name="email" onChange={eventoTeclado} placeholder="Email do contato" className='form-control'/>


        {
            botao
            ?
            <input type='button' value="Cadastrar" onClick={cadastrar} className='btn btn-primary'/>
            :
            <div>
                <input type='button' value="Alterar" onClick={alterar} className='btn btn-warning'/>
                <input type='button' value="Remover" onClick={remover} className='btn btn-danger'/>
                <input type='button' value="Cancelar" onClick={cancelar} className='btn btn-secondary'/>
            </div>
        }
        
        
    </form>
    )
}

export default Formulario;
const mongoose = require('mongoose');
const listaServices = require('../services/lista.services');

const getLista = async (req, res) => {
    const lista = await listaServices.getLista();
    res.send(lista);
}

const getListaById = async (req, res) => {
    const id = req.params.id;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({message: 'Id Invalido, porfavor verifique as informações.'})
      return
    }
  
    const lista = await listaServices.getListaById(id);
    
    if(!lista) {
      res.status(404).send({message: 'Lista nao encontrada!!!'});
      return;
    }
  
    res.send(lista);
  }
  
  const createLista = async (req, res) => {
    const lista = req.body;
  
    await listaServices.createLista(lista)
    .then(() => {
      res.send({message: `Lista ${lista.titulo} cadastrado com sucesso!`})
    })
    .catch((err) => {
      res.status(500).send({message: `Erro no servidor: ${err}`});
    })
  }
  
  const editLista = async (req, res) => {
    const id = req.params.id;
    const listaEdit = req.body;
  
    await listaServices.editLista(id, listaEdit)
    .then(() => res.send({message: 'Lista Editada com sucesso'}))
    .catch(err => res.status(500).send({message: `Erro no servidor: ${err}`}))
  }
  
  const deleteLista = async (req, res) => {
    const id = req.params.id;
  
    await listaServices.deleteLista(id)
    .then(() => res.send({message: 'Lista excluida com sucesso'}))
    .catch((err) => res.status(500).send({message: `Erro no servidor: ${err}`}))
  
  }
  
module.exports = {
    getLista,
    getListaById,
    createLista,
    editLista,
    deleteLista
}
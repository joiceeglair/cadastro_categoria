import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/Navbar";
import { useQueryClient } from "react-query";
import axios from "axios";

type Inputs = {
  Nome: string,
  Descricao: string,
};


export function Cadastro() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const [Nome, setNome] = useState<string>('');
  const [Descricao, setDescricao] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const queryClient = useQueryClient();

  const onSubmit = handleSubmit((data) => {
    const url = 'https://cnctesteapl.azurewebsites.net/odata/CategoriaCliente'
    const dados = {
      'Nome': data.Nome,
      'Descricao': data.Descricao,
      '_IdEntidadeSindical': '6a8be2a2-2636-43d4-b9c0-002a50888604'
      };

    const headers = {
      'Content-Type': 'application/json;odata=verbose'
    }

    axios.post(url, dados, { headers })
      .then(response => console.log(response))
      .finally(() => {
        setSuccess('Categoria cadastrada com sucesso ✓')
        queryClient.invalidateQueries('categorias')
      })

    setNome('')
    setDescricao('')
  });

  return (
    <div>
      <Navbar />
      <div className="p-5 flex justify-center">
        <div className="container p-10 max-w-[700px] border border-zinc-300 rounded-2xl shadow-xl">
          <h2 className="text-3xl mb-4">Cadastrar Categoria</h2>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-2"
            >

            <input
              {...register("Nome", { required: true })}
              placeholder="Nome"
              className="p-2 border border-solid border-zinc-300 rounded-md"
              value={Nome}
              onChange={e => {
                setNome(e.target.value)
                setSuccess('')
              }}
            />
            {errors.Nome && <span className="text-zinc-500 text-sm mb-2">Esse campo é obrigatório.</span>}

            <textarea
              {...register("Descricao")}
              placeholder="Descrição"
              className="p-2 border border-solid border-zinc-300 rounded-md"
              value={Descricao}
              onChange={e => {
                setDescricao(e.target.value)
                setSuccess('')
              }}
              />

            <input
              type="submit"
              value="Cadastrar"
              className="p-2 border rounded-md border-zinc-300 cursor-pointer hover:bg-white"
              />
              <span className="text-zinc-500 text-sm mb-2">{success}</span>
          </form>
        </div>
      </div>
    </div>
  )
}